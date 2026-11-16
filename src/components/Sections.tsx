import Link from "next/link";
import { clients, keyFigures, method, site, testimonials } from "@/lib/site";
import type { Project } from "@/db/schema";
import type { PostWithCategory } from "@/lib/queries";

export function Stars() {
  return (
    <div role="img" aria-label="5 étoiles sur 5" className="flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#f26335">
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1z" />
        </svg>
      ))}
    </div>
  );
}

export function KeyFigures() {
  return (
    <section className="container-site flex flex-col gap-8 pb-20">
      <dl className="card grid gap-6 px-7 py-8 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
        {keyFigures.map((f) => (
          <div key={f.label} className="flex flex-col">
            <dt className="text-sm text-muted">{f.label}</dt>
            <dd className="font-arvo text-[1.7rem] leading-tight">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-[15px] font-bold tracking-[1.5px] text-soft">
        <span className="font-medium tracking-normal">Ils m’ont fait confiance</span>
        {clients.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </section>
  );
}

export function Method() {
  return (
    <section id="methode" className="bg-peach">
      <div className="container-site flex flex-col gap-12 py-20 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="eyebrow">Méthode</p>
          <h2 className="h-section">Aucune solution proposée sans avoir rencontré vos équipes.</h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {method.map((m) => (
            <li key={m.n} className="flex flex-col gap-3 rounded-[20px] bg-white p-7">
              <span className="font-arvo text-[2.1rem] leading-none text-brand-dark">{m.n}</span>
              <h3 className="text-[19px] font-bold">{m.title}</h3>
              <p className="text-base text-muted">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { featured, others } = testimonials;
  return (
    <section className="container-site flex flex-col gap-12 py-20 lg:py-24">
      <h2 className="h-section">Ce qu’en disent mes clients</h2>
      <div className="grid gap-7 lg:grid-cols-3">
        <figure className="card flex flex-col gap-6 p-8 sm:p-10 lg:col-span-2">
          <Stars />
          <blockquote className="font-arvo text-[1.35rem] leading-relaxed">« {featured.quote} »</blockquote>
          <p className="text-base text-muted">{featured.context}</p>
          <figcaption className="text-[15px]">
            <strong>{featured.name}</strong> · {featured.role}
          </figcaption>
        </figure>
        <div className="flex flex-col gap-7">
          {others.map((t) => (
            <figure key={t.name} className="card flex flex-col gap-4 p-7">
              <blockquote>« {t.quote} »</blockquote>
              <figcaption className="text-[15px]">
                <strong>{t.name}</strong> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <section id="realisations" className="container-site flex flex-col gap-12 py-20 lg:py-24">
      <div className="flex max-w-3xl flex-col gap-3">
        <p className="eyebrow">Réalisations</p>
        <h2 className="h-section">Des projets livrés, utilisés tous les jours.</h2>
      </div>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.id} className="card flex flex-col overflow-hidden">
            {p.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.coverImageUrl} alt={p.coverImageAlt} loading="lazy" className="h-56 w-full object-cover" />
            ) : (
              <div aria-hidden="true" className="h-56 bg-peach-strong" />
            )}
            <div className="flex flex-col gap-3 p-7">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-soft">
                {[p.clientName, p.serviceType].filter(Boolean).join(" · ")}
              </p>
              <h3 className="text-[21px] font-semibold leading-snug">{p.title}</h3>
              <p className="text-base text-muted">{p.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PostCard({ post }: { post: PostWithCategory }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3.5">
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt={post.coverImageAlt} loading="lazy" className="h-52 w-full rounded-[20px] object-cover" />
      ) : (
        <span aria-hidden="true" className="block h-52 rounded-[20px] bg-peach-strong" />
      )}
      <span className="text-[13px] font-semibold uppercase tracking-wider text-soft">
        {[post.category?.name, `${post.readingMinutes} min`].filter(Boolean).join(" · ")}
      </span>
      <span className="text-[21px] font-semibold leading-snug group-hover:text-brand-dark">{post.title}</span>
      {post.excerpt && <span className="text-base text-muted">{post.excerpt}</span>}
    </Link>
  );
}

export function BlogTeaser({ posts }: { posts: PostWithCategory[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="border-y border-line bg-white">
      <div className="container-site flex flex-col gap-12 py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Blog</p>
            <h2 className="h-section">Comprendre avant d’investir</h2>
          </div>
          <Link href="/blog" className="link-arrow">Tous les articles</Link>
        </div>
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CallToAction({ title = "Un projet ? Parlons-en 30 minutes." }: { title?: string }) {
  return (
    <section className="container-site py-20 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-8 rounded-[32px] bg-ink px-7 py-12 text-ground sm:px-14 sm:py-16 lg:flex-row lg:items-center">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="h-section">{title}</h2>
          <p className="text-[#d8ccc6]">
            Logiciels, automatisations et sites sur mesure à partir de {site.priceFrom}. 15 jours de développement minimum, livrable défini avant de commencer.
          </p>
        </div>
        <a href={site.booking} className="btn-primary shrink-0">Programmer une réunion</a>
      </div>
    </section>
  );
}
