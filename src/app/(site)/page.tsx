import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import ServiceTabs from "@/components/ServiceTabs";
import { BlogTeaser, CallToAction, KeyFigures, Method, Projects, Testimonials } from "@/components/Sections";
import { getCities, getPosts, getProjects } from "@/lib/queries";
import { services, site } from "@/lib/site";

export const revalidate = 300;

export default async function Home() {
  const [projects, posts, cities] = await Promise.all([getProjects(3), getPosts(3), getCities()]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.name,
          url: site.url,
          logo: `${site.url}/logo_orange.png`,
          description: site.description,
          email: site.email,
          telephone: site.phone,
          priceRange: `À partir de ${site.priceFrom}`,
          address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "FR" },
          areaServed: (cities.length ? cities.map((c) => c.name) : [site.city]).map((name) => ({ "@type": "City", name })),
          sameAs: [site.linkedin, site.youtube],
        }}
      />
      <Hero badge={`Basé à ${site.city} · Provence et vallée du Rhône`} title={site.title} subtitle={site.baseline} />
      <KeyFigures />
      <section id="services" className="border-y border-line bg-white">
        <div className="container-site flex flex-col gap-12 py-20 lg:py-24">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="eyebrow">Services</p>
            <h2 className="h-section">Quel est votre besoin ?</h2>
            <p className="text-muted">Choisissez un sujet : vous voyez ce que je peux construire pour vous.</p>
          </div>
          <ServiceTabs services={services} />
        </div>
      </section>
      <Projects projects={projects} />
      <Method />
      <Testimonials />
      <BlogTeaser posts={posts} />
      <CallToAction />
    </>
  );
}
