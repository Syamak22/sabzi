import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { CallToAction } from "@/components/Sections";
import { formatDate, renderMarkdown } from "@/lib/markdown";
import { getPost, getPosts } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.status === "published" ? undefined : { index: false },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, alt: post.coverImageAlt }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription || post.excerpt,
          datePublished: post.publishedAt?.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          image: post.coverImageUrl || undefined,
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          author: { "@type": "Person", name: "Syamak Azadeh", url: site.linkedin },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo_orange.png` } },
        }}
      />
      <article className="container-site flex flex-col gap-10 pb-8 pt-6">
        <header className="mx-auto flex w-full max-w-[820px] flex-col gap-5">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap gap-2 text-sm text-soft">
            <Link href="/" className="underline underline-offset-4 hover:text-brand-dark">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="underline underline-offset-4 hover:text-brand-dark">Blog</Link>
            {post.category && (
              <>
                <span aria-hidden="true">/</span>
                <span>{post.category.name}</span>
              </>
            )}
          </nav>
          <h1 className="font-arvo text-[2.1rem] leading-[1.15] sm:text-[3.1rem]">{post.title}</h1>
          {post.excerpt && <p className="text-[1.3rem] text-muted">{post.excerpt}</p>}
          <p className="text-[15px] text-soft">
            Par <strong className="text-ink">Syamak Azadeh</strong>
            {post.publishedAt && <> · <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time></>}
            {" "}· {post.readingMinutes} min de lecture
          </p>
        </header>
        {post.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImageUrl} alt={post.coverImageAlt} className="max-h-[460px] w-full rounded-[28px] object-cover" />
        )}
        <div className="prose-sabzi mx-auto w-full max-w-[720px]" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.contentMd) }} />
      </article>
      <CallToAction title="Vous avez un projet en tête ?" />
    </>
  );
}
