import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import { CallToAction, Method, Testimonials } from "@/components/Sections";
import { getCities, getCity } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import { CITY_PREFIX, services, site } from "@/lib/site";
import { deVille } from "@/lib/villes";
import type { City } from "@/db/schema";

// Une seule route pour les pages de service (/logiciel-sur-mesure) et les pages locales (/logiciel-site-web-avignon).
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const cities = await getCities();
  return [...services.map((s) => ({ slug: s.slug })), ...cities.map((c) => ({ slug: CITY_PREFIX + c.slug }))];
}

async function resolve(slug: string) {
  const service = services.find((s) => s.slug === slug);
  if (service) return { service, city: null };
  if (slug.startsWith(CITY_PREFIX)) {
    const city = await getCity(slug.slice(CITY_PREFIX.length));
    if (city) return { service: null, city };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await resolve(slug);
  if (!page) return {};
  if (page.service) {
    return {
      title: `${page.service.label} pour PME`,
      description: page.service.metaDescription,
      alternates: { canonical: `/${slug}` },
    };
  }
  const city = page.city!;
  const de = deVille(city.name);
  return {
    title: `Logiciel sur mesure et site web pour PME ${de}`,
    description:
      city.metaDescription ||
      `Logiciels sur mesure, automatisations et sites web pour les PME ${de}. Première réunion dans vos locaux, livraison par étapes de 15 jours, à partir de ${site.priceFrom}.`,
    alternates: { canonical: `/${slug}` },
    robots: city.status === "published" ? undefined : { index: false },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await resolve(slug);
  if (!page) notFound();
  return page.service ? <ServicePage slug={page.service.slug} /> : <CityPage city={page.city!} />;
}

function Breadcrumb({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            ...(it.href ? { item: site.url + it.href } : {}),
          })),
        }}
      />
      <nav aria-label="Fil d'Ariane" className="container-site flex flex-wrap gap-2 pt-2 text-sm text-soft">
        {items.map((it, i) => (
          <span key={it.name} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.href ? <Link href={it.href} className="underline underline-offset-4 hover:text-brand-dark">{it.name}</Link> : <span>{it.name}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}

function ServicePage({ slug }: { slug: string }) {
  const s = services.find((x) => x.slug === slug)!;
  return (
    <>
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: s.label }]} />
      <section className="container-site flex max-w-[900px] flex-col gap-6 pb-16 pt-10">
        <p className="eyebrow">{s.label}</p>
        <h1 className="h-display">{s.title}</h1>
        <p className="text-xl text-muted">{s.text}</p>
        <div className="flex flex-wrap gap-4">
          <a href={site.booking} className="btn-primary">Programmer une réunion</a>
          <Link href="/#realisations" className="btn-secondary">Voir les réalisations</Link>
        </div>
      </section>
      <section className="border-y border-line bg-white">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="h-section">Ce que vous obtenez</h2>
            <ul className="flex flex-col gap-3.5">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-3.5">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b8401c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="h-section">Exemples</h2>
            <div className="flex flex-wrap gap-2.5">
              {s.examples.map((e) => (
                <span key={e} className="rounded-full border border-line-strong bg-ground px-4 py-2 text-[15px] font-medium">{e}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Method />
      <Testimonials />
      <CallToAction />
    </>
  );
}

async function CityPage({ city }: { city: City }) {
  const de = deVille(city.name);
  const others = (await getCities()).filter((c) => c.id !== city.id);
  const faq = [
    {
      q: `Vous déplacez-vous à ${city.name} ?`,
      a: `Oui. Je suis basé à ${site.city} et la première réunion a lieu dans vos locaux, à ${city.name}.`,
    },
    {
      q: `Combien coûte un logiciel sur mesure pour une PME ${de} ?`,
      a: `Un projet démarre à partir de ${site.priceFrom}, pour 15 jours de développement minimum. Le livrable est défini avant de commencer.`,
    },
    {
      q: "En combien de temps mon outil est-il utilisable ?",
      a: "Une à deux fonctionnalités prioritaires sont livrées en 15 jours, testées et validées par vos équipes.",
    },
    ...(city.faqQuestion && city.faqAnswer ? [{ q: city.faqQuestion, a: city.faqAnswer }] : []),
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: "Zones d’intervention", href: "/zones-intervention" }, { name: city.name }]} />
      <Hero
        badge={`Intervention sur place à ${city.name}`}
        title={`Logiciel sur mesure et site web pour PME ${de}`}
        subtitle={
          <>
            Je construis les outils qui manquent aux entreprises <strong className="text-ink">{de}</strong>, et je les livre par étapes de 15 jours.
          </>
        }
      />

      {/* Bloc unique : contexte local */}
      {(city.contextMd || city.nearbyMd) && (
        <section className="border-y border-line bg-white">
          <div className="container-site grid gap-12 py-20 lg:grid-cols-[3fr_2fr]">
            <div className="flex flex-col gap-4">
              <h2 className="h-section">Les PME {de} et leurs outils</h2>
              <div className="prose-sabzi text-muted" dangerouslySetInnerHTML={{ __html: renderMarkdown(city.contextMd) }} />
            </div>
            {city.nearbyMd && (
              <div className="flex flex-col gap-3 self-start rounded-[20px] bg-ground p-7">
                <h3 className="text-lg font-bold">Autour de {city.name}</h3>
                <div className="prose-sabzi !text-base text-muted" dangerouslySetInnerHTML={{ __html: renderMarkdown(city.nearbyMd) }} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bloc commun + ville : services */}
      <section className="container-site flex flex-col gap-8 py-20">
        <h2 className="h-section">Ce que je construis pour les entreprises {de}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.slug} className="card flex flex-col gap-2.5 !rounded-[20px] p-7">
              <h3 className="text-xl font-bold">{s.label}</h3>
              <p className="text-base text-muted">{s.text}</p>
              <Link href={`/${s.slug}`} className="link-arrow self-start">En savoir plus</Link>
            </article>
          ))}
        </div>
      </section>

      {/* Bloc unique : cas d'usage local */}
      {city.useCaseTitle && city.useCaseMd && (
        <section className="bg-peach">
          <div className="container-site py-20">
            <article className="flex flex-col gap-4 rounded-3xl bg-white p-8 sm:p-10">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-soft">Exemple de besoin à {city.name}</p>
              <h2 className="font-arvo text-[1.9rem] leading-tight">{city.useCaseTitle}</h2>
              <div className="prose-sabzi text-muted" dangerouslySetInnerHTML={{ __html: renderMarkdown(city.useCaseMd) }} />
              <a href={site.booking} className="link-arrow self-start">Parler de votre besoin</a>
            </article>
          </div>
        </section>
      )}

      <Method />
      <Testimonials />

      <section className="border-y border-line bg-white">
        <div className="mx-auto flex max-w-[860px] flex-col gap-2 px-5 py-20 sm:px-8">
          <h2 className="h-section mb-4">Questions fréquentes</h2>
          {faq.map((f) => (
            <div key={f.q} className="flex flex-col gap-1.5 border-b border-line-strong py-5 last:border-0">
              <h3 className="text-[19px] font-bold">{f.q}</h3>
              <p className="text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="container-site flex flex-col gap-6 pt-20">
          <h2 className="font-arvo text-[1.9rem]">J’interviens aussi autour {de}</h2>
          <div className="flex flex-wrap gap-2.5">
            {others.map((c) => (
              <Link key={c.id} href={`/${CITY_PREFIX}${c.slug}`} className="rounded-full border border-line-strong bg-white px-5 py-2.5 text-[15px] font-semibold hover:border-brand">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <CallToAction title={`Un projet à ${city.name} ? Parlons-en 30 minutes.`} />
    </>
  );
}
