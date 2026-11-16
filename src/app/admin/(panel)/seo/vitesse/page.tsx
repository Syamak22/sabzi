import { eq } from "drizzle-orm";
import SpeedTest from "./SpeedTest";
import { getDb } from "@/db";
import { cities, posts } from "@/db/schema";
import { CITY_PREFIX, services } from "@/lib/site";

export const metadata = { title: "Test de vitesse" };

export default async function SpeedPage() {
  const db = getDb()!;
  const [c, p] = await Promise.all([
    db.select({ slug: cities.slug }).from(cities).where(eq(cities.status, "published")),
    db.select({ slug: posts.slug }).from(posts).where(eq(posts.status, "published")),
  ]);
  const paths = ["/", ...services.map((s) => `/${s.slug}`), ...c.map((x) => `/${CITY_PREFIX}${x.slug}`), "/blog", ...p.map((x) => `/blog/${x.slug}`), "/contact"];
  return <SpeedTest paths={paths} />;
}
