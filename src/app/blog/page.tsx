import type { Metadata } from "next";
import { CallToAction, PostCard } from "@/components/Sections";
import { getPosts } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog : logiciel sur mesure, automatisation et site web",
  description: "Guides, retours d’expérience et études de cas sur les logiciels sur mesure, l’automatisation et les sites web pour PME.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <section className="container-site flex flex-col gap-12 pb-8 pt-10">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="h-display">Le blog</h1>
          <p className="text-xl text-muted">
            Guides, retours d’expérience et études de cas sur les logiciels sur mesure, l’automatisation et les sites web.
          </p>
        </div>
        {posts.length === 0 ? (
          <p className="card p-8 text-muted">Les premiers articles arrivent bientôt.</p>
        ) : (
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </section>
      <CallToAction />
    </>
  );
}
