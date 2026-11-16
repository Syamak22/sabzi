import type { MetadataRoute } from "next";
import { getCities, getPosts } from "@/lib/queries";
import { CITY_PREFIX, services, site } from "@/lib/site";

export const revalidate = 300;

// Généré automatiquement : toute page publiée y apparaît sans intervention.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, cities] = await Promise.all([getPosts(), getCities()]);
  const published = <T extends { status: string }>(rows: T[]) => rows.filter((r) => r.status === "published");
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${site.url}/zones-intervention`, changeFrequency: "monthly", priority: 0.6 },
    ...published(cities).map((c) => ({
      url: `${site.url}/${CITY_PREFIX}${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...published(posts).map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
