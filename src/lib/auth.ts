import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";

const COOKIE = "sabzi_session";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (s && s.length >= 32) return s;
  if (process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET manquant ou trop court (32 caractères minimum).");
  return "secret-de-developpement-a-ne-pas-utiliser-en-production";
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export async function createSession(userId: number) {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp: Math.floor(Date.now() / 1000) + MAX_AGE })).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSessionUser(): Promise<{ id: number; email: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof uid !== "number" || typeof exp !== "number" || exp < Date.now() / 1000) return null;
    const db = getDb();
    if (!db) return null;
    const rows = await db.select({ id: users.id, email: users.email }).from(users).where(eq(users.id, uid)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

// À appeler en tête de chaque page et de chaque action du back-office.
export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/connexion");
  return user;
}
