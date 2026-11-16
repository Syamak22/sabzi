import { and, asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { categories, cities, posts, projects, type Category, type City, type Post, type Project } from "@/db/schema";

const showDrafts = process.env.SHOW_DRAFTS === "true";

// Toute erreur de base (absente au build, coupure) renvoie une valeur vide plutôt qu'une page d'erreur.
async function safe<T>(fallback: T, run: (db: NonNullable<ReturnType<typeof getDb>>) => Promise<T>): Promise<T> {
  const db = getDb();
  if (!db) return fallback;
  try {
    return await run(db);
  } catch (e) {
    console.error("[db]", e);
    return fallback;
  }
}

export type PostWithCategory = Post & { category: Category | null };

export function getPosts(limit?: number): Promise<PostWithCategory[]> {
  return safe([], async (db) => {
    const q = db
      .select({ post: posts, category: categories })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(showDrafts ? undefined : eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt), desc(posts.createdAt));
    const rows = limit ? await q.limit(limit) : await q;
    return rows.map((r) => ({ ...r.post, category: r.category }));
  });
}

export function getPost(slug: string): Promise<PostWithCategory | null> {
  return safe(null, async (db) => {
    const rows = await db
      .select({ post: posts, category: categories })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(showDrafts ? eq(posts.slug, slug) : and(eq(posts.slug, slug), eq(posts.status, "published")))
      .limit(1);
    return rows[0] ? { ...rows[0].post, category: rows[0].category } : null;
  });
}

export function getCities(): Promise<City[]> {
  return safe([], (db) =>
    db
      .select()
      .from(cities)
      .where(showDrafts ? undefined : eq(cities.status, "published"))
      .orderBy(asc(cities.position)),
  );
}

export function getCity(slug: string): Promise<City | null> {
  return safe(null, async (db) => {
    const rows = await db
      .select()
      .from(cities)
      .where(showDrafts ? eq(cities.slug, slug) : and(eq(cities.slug, slug), eq(cities.status, "published")))
      .limit(1);
    return rows[0] ?? null;
  });
}

export function getProjects(limit?: number): Promise<Project[]> {
  return safe([], async (db) => {
    const q = db
      .select()
      .from(projects)
      .where(showDrafts ? undefined : eq(projects.status, "published"))
      .orderBy(asc(projects.position));
    return limit ? await q.limit(limit) : await q;
  });
}
