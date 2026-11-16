"use server";

import { mkdir, unlink, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { cities, contacts, keywords, media, posts, projects, users } from "@/db/schema";
import { createSession, destroySession, requireAdmin, verifyPassword } from "@/lib/auth";
import { mediaDir } from "@/lib/media";
import { runPageSpeed, type SpeedResult } from "@/lib/pagespeed";
import { CITY_PREFIX, site } from "@/lib/site";
import { STAGES } from "@/lib/stages";
import { countWords, slugify } from "@/lib/slug";

export type FormState = { error: string } | null;

const str = (f: FormData, k: string, max = 5000) => String(f.get(k) ?? "").trim().slice(0, max);
const raw = (f: FormData, k: string, max = 200000) => String(f.get(k) ?? "").replace(/\r\n/g, "\n").slice(0, max);

function db() {
  const d = getDb();
  if (!d) throw new Error("Base de données indisponible");
  return d;
}

// --- Connexion ---------------------------------------------------------------

const attempts = new Map<string, number[]>();

export async function login(_prev: FormState, f: FormData): Promise<FormState> {
  const email = str(f, "email", 255).toLowerCase();
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  const key = `${ip}:${email}`;
  const recent = (attempts.get(key) ?? []).filter((t) => Date.now() - t < 10 * 60 * 1000);
  if (recent.length >= 5) return { error: "Trop de tentatives. Réessayez dans 10 minutes." };
  const d = getDb();
  if (!d) return { error: "Base de données indisponible." };
  const [user] = await d.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user || !verifyPassword(String(f.get("password") ?? ""), user.passwordHash)) {
    attempts.set(key, [...recent, Date.now()]);
    return { error: "E-mail ou mot de passe incorrect." };
  }
  attempts.delete(key);
  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/connexion");
}

// --- Articles ----------------------------------------------------------------

async function uniqueSlug(table: typeof posts | typeof projects | typeof cities, base: string, excludeId?: number) {
  const d = db();
  let slug = slugify(base);
  for (let n = 2; ; n++) {
    const where = excludeId ? and(eq(table.slug, slug), ne(table.id, excludeId)) : eq(table.slug, slug);
    const rows = await d.select({ id: table.id }).from(table).where(where).limit(1);
    if (rows.length === 0) return slug;
    slug = `${slugify(base)}-${n}`;
  }
}

function refreshPublic(...paths: string[]) {
  for (const p of ["/", "/blog", "/zones-intervention", "/sitemap.xml", ...paths]) revalidatePath(p);
  revalidatePath("/", "layout");
}

export async function savePost(_prev: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(f.get("id")) || undefined;
  const title = str(f, "title", 200);
  if (!title) return { error: "Le titre est obligatoire." };
  const d = db();
  const existing = id ? (await d.select().from(posts).where(eq(posts.id, id)).limit(1))[0] : undefined;
  const intent = str(f, "intent", 20);
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : (existing?.status ?? "draft");
  const slug = await uniqueSlug(posts, str(f, "slug", 200) || title, id);
  const contentMd = raw(f, "contentMd");
  const values = {
    title,
    slug,
    excerpt: str(f, "excerpt", 600),
    contentMd,
    coverImageUrl: str(f, "coverImageUrl", 500),
    coverImageAlt: str(f, "coverImageAlt", 255),
    metaTitle: str(f, "metaTitle", 255),
    metaDescription: str(f, "metaDescription", 500),
    focusKeyword: str(f, "focusKeyword", 120),
    categoryId: Number(f.get("categoryId")) || null,
    readingMinutes: Math.max(1, Math.round(countWords(contentMd) / 200)),
    status,
    publishedAt: status === "published" ? (existing?.publishedAt ?? new Date()) : (existing?.publishedAt ?? null),
    updatedAt: new Date(),
  };
  let savedId = id;
  if (existing) await d.update(posts).set(values).where(eq(posts.id, existing.id));
  else savedId = (await d.insert(posts).values(values).returning({ id: posts.id }))[0].id;
  refreshPublic(`/blog/${slug}`, ...(existing && existing.slug !== slug ? [`/blog/${existing.slug}`] : []));
  redirect(`/admin/articles/${savedId}?ok=1`);
}

export async function deletePost(f: FormData) {
  await requireAdmin();
  const id = Number(f.get("id"));
  const [row] = await db().delete(posts).where(eq(posts.id, id)).returning({ slug: posts.slug });
  if (row) refreshPublic(`/blog/${row.slug}`);
  redirect("/admin/articles");
}

// --- Pages locales -----------------------------------------------------------

export async function addCity(_prev: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const name = str(f, "name", 120);
  if (!name) return { error: "Le nom de la ville est obligatoire." };
  const d = db();
  const slug = slugify(name);
  if ((await d.select({ id: cities.id }).from(cities).where(eq(cities.slug, slug)).limit(1)).length) return { error: "Cette ville existe déjà." };
  const all = await d.select({ position: cities.position }).from(cities);
  const [row] = await d
    .insert(cities)
    .values({ name, slug, department: str(f, "department", 120), position: Math.max(0, ...all.map((c) => c.position)) + 1 })
    .returning({ id: cities.id });
  redirect(`/admin/villes/${row.id}`);
}

export async function saveCity(_prev: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(f.get("id"));
  const d = db();
  const [existing] = await d.select().from(cities).where(eq(cities.id, id)).limit(1);
  if (!existing) return { error: "Ville introuvable." };
  const values = {
    name: str(f, "name", 120) || existing.name,
    department: str(f, "department", 120),
    contextMd: raw(f, "contextMd", 20000).trim(),
    nearbyMd: raw(f, "nearbyMd", 5000).trim(),
    useCaseTitle: str(f, "useCaseTitle", 200),
    useCaseMd: raw(f, "useCaseMd", 20000).trim(),
    faqQuestion: str(f, "faqQuestion", 255),
    faqAnswer: str(f, "faqAnswer", 3000),
    metaDescription: str(f, "metaDescription", 500),
    updatedAt: new Date(),
  };
  const intent = str(f, "intent", 20);
  let status = existing.status;
  if (intent === "unpublish") status = "draft";
  if (intent === "publish") {
    // Garde-fou : une page locale sans contenu propre est une page satellite, ignorée ou pénalisée par Google.
    const missing = [
      countWords(values.contextMd) < 80 && "le contexte local (80 mots minimum)",
      !values.nearbyMd && "les communes voisines",
      (!values.useCaseTitle || countWords(values.useCaseMd) < 40) && "le cas d’usage (titre et 40 mots minimum)",
      (!values.faqQuestion || !values.faqAnswer) && "la question propre à la ville",
    ].filter(Boolean);
    if (missing.length) {
      await d.update(cities).set(values).where(eq(cities.id, id));
      return { error: `Brouillon enregistré, mais publication impossible. Il manque : ${missing.join(", ")}.` };
    }
    status = "published";
  }
  await d.update(cities).set({ ...values, status }).where(eq(cities.id, id));
  refreshPublic(`/${CITY_PREFIX}${existing.slug}`);
  redirect(`/admin/villes/${id}?ok=1`);
}

export async function deleteCity(f: FormData) {
  await requireAdmin();
  const [row] = await db().delete(cities).where(eq(cities.id, Number(f.get("id")))).returning({ slug: cities.slug });
  if (row) refreshPublic(`/${CITY_PREFIX}${row.slug}`);
  redirect("/admin/villes");
}

// --- Réalisations ------------------------------------------------------------

export async function saveProject(_prev: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(f.get("id")) || undefined;
  const title = str(f, "title", 200);
  if (!title) return { error: "Le titre est obligatoire." };
  const d = db();
  const values = {
    title,
    slug: await uniqueSlug(projects, str(f, "slug", 200) || title, id),
    clientName: str(f, "clientName", 160),
    serviceType: str(f, "serviceType", 80),
    summary: str(f, "summary", 1000),
    coverImageUrl: str(f, "coverImageUrl", 500),
    coverImageAlt: str(f, "coverImageAlt", 255),
    position: Number(f.get("position")) || 0,
    status: f.get("published") ? "published" : "draft",
    updatedAt: new Date(),
  };
  let savedId = id;
  if (id) await d.update(projects).set(values).where(eq(projects.id, id));
  else savedId = (await d.insert(projects).values(values).returning({ id: projects.id }))[0].id;
  refreshPublic();
  redirect(`/admin/realisations/${savedId}?ok=1`);
}

export async function deleteProject(f: FormData) {
  await requireAdmin();
  await db().delete(projects).where(eq(projects.id, Number(f.get("id"))));
  refreshPublic();
  redirect("/admin/realisations");
}

// --- Contacts ----------------------------------------------------------------

const STAGE_IDS = STAGES.map((s) => s.id);

export async function setContactStage(id: number, stage: string) {
  await requireAdmin();
  if (!STAGE_IDS.includes(stage)) return;
  await db().update(contacts).set({ stage, updatedAt: new Date() }).where(eq(contacts.id, id));
  revalidatePath("/admin/contacts");
}

export async function saveContact(_prev: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(f.get("id")) || undefined;
  const name = str(f, "name", 160);
  const email = str(f, "email", 255);
  if (!name || !email) return { error: "Le nom et l’e-mail sont obligatoires." };
  const stage = STAGE_IDS.includes(str(f, "stage")) ? str(f, "stage") : "nouveau";
  const values = { name, email, company: str(f, "company", 160), phone: str(f, "phone", 40), notes: raw(f, "notes", 10000).trim(), stage, updatedAt: new Date() };
  if (id) await db().update(contacts).set(values).where(eq(contacts.id, id));
  else await db().insert(contacts).values({ ...values, message: raw(f, "message", 5000).trim() || "Ajouté manuellement.", source: "Ajout manuel" });
  redirect("/admin/contacts");
}

export async function deleteContact(f: FormData) {
  await requireAdmin();
  await db().delete(contacts).where(eq(contacts.id, Number(f.get("id"))));
  redirect("/admin/contacts");
}

// --- Médias ------------------------------------------------------------------

const MIME: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif" };

export async function uploadMedia(_prev: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const file = f.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choisissez une image." };
  const ext = MIME[file.type];
  if (!ext) return { error: "Format refusé. Formats acceptés : JPG, PNG, WebP, GIF, AVIF." };
  if (file.size > 5 * 1024 * 1024) return { error: "Image trop lourde (5 Mo maximum). Compressez-la : une image lourde ralentit la page." };
  const alt = str(f, "alt", 255);
  if (!alt) return { error: "Le texte alternatif est obligatoire : il décrit l’image à Google et aux lecteurs d’écran." };
  const filename = `${slugify(alt).slice(0, 60)}-${randomBytes(4).toString("hex")}.${ext}`;
  await mkdir(mediaDir(), { recursive: true });
  await writeFile(path.join(mediaDir(), filename), Buffer.from(await file.arrayBuffer()));
  await db().insert(media).values({ filename, alt, mime: file.type, size: file.size });
  redirect("/admin/medias");
}

export async function deleteMedia(f: FormData) {
  await requireAdmin();
  const [row] = await db().delete(media).where(eq(media.id, Number(f.get("id")))).returning({ filename: media.filename });
  if (row) await unlink(path.join(mediaDir(), path.basename(row.filename))).catch(() => {});
  redirect("/admin/medias");
}

// --- Centre SEO --------------------------------------------------------------

export async function addKeyword(_prev: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const term = str(f, "term", 200).toLowerCase();
  if (!term) return { error: "Indiquez un mot-clé." };
  await db().insert(keywords).values({ term, targetPath: str(f, "targetPath", 300) }).onConflictDoNothing();
  redirect("/admin/seo");
}

export async function deleteKeyword(f: FormData) {
  await requireAdmin();
  await db().delete(keywords).where(eq(keywords.id, Number(f.get("id"))));
  redirect("/admin/seo");
}

export type SpeedState = { result?: SpeedResult; error?: string } | null;

export async function testSpeed(_prev: SpeedState, f: FormData): Promise<SpeedState> {
  await requireAdmin();
  const pathName = str(f, "path", 300) || "/";
  if (!pathName.startsWith("/")) return { error: "Indiquez un chemin commençant par « / »." };
  return runPageSpeed(site.url + pathName, f.get("strategy") === "desktop" ? "desktop" : "mobile");
}
