import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PostEditor from "./PostEditor";
import { getDb } from "@/db";
import { categories, posts } from "@/db/schema";
import { siteHost } from "@/lib/audit";

export const metadata = { title: "Article" };

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string }> };

export default async function PostEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const db = getDb()!;
  const cats = await db.select().from(categories).orderBy(categories.name);
  let post = null;
  if (id !== "nouveau") {
    [post] = await db.select().from(posts).where(eq(posts.id, Number(id) || 0)).limit(1);
    if (!post) notFound();
  }
  return <PostEditor post={post} categories={cats} siteHost={siteHost} saved={(await searchParams).ok === "1"} />;
}
