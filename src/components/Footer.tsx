import Image from "next/image";
import Link from "next/link";
import { CITY_PREFIX, services, site } from "@/lib/site";
import { getCities } from "@/lib/queries";

export default async function Footer() {
  const cities = await getCities();
  return (
    <footer className="border-t border-line-strong">
      <div className="container-site grid gap-10 py-12 text-[15px] text-muted sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Image src="/logo_orange.png" alt="Sabzi" width={334} height={130} className="h-8 w-auto self-start" />
          <p>Logiciels sur mesure, automatisation et sites web pour les PME. Basé à {site.city}.</p>
        </div>
        <nav aria-label="Services" className="flex flex-col">
          <p className="mb-1 font-bold text-ink">Services</p>
          {services.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className="py-1.5 hover:text-brand-dark">
              {s.label}
            </Link>
          ))}
          <Link href="/blog" className="py-1.5 hover:text-brand-dark">Blog</Link>
        </nav>
        <nav aria-label="Zones d'intervention" className="flex flex-col">
          <p className="mb-1 font-bold text-ink">Zones d’intervention</p>
          {cities.map((c) => (
            <Link key={c.slug} href={`/${CITY_PREFIX}${c.slug}`} className="py-1.5 hover:text-brand-dark">
              {c.name}
            </Link>
          ))}
          <Link href="/zones-intervention" className="py-1.5 hover:text-brand-dark">Toutes les zones</Link>
        </nav>
        <div className="flex flex-col">
          <p className="mb-1 font-bold text-ink">Contact</p>
          <a href={`mailto:${site.email}`} className="py-1.5 hover:text-brand-dark">{site.email}</a>
          <a href={site.phoneHref} className="py-1.5 hover:text-brand-dark">{site.phone}</a>
          <Link href="/contact" className="py-1.5 hover:text-brand-dark">Formulaire de contact</Link>
          <a href={site.linkedin} className="py-1.5 hover:text-brand-dark">LinkedIn</a>
          <a href={site.youtube} className="py-1.5 hover:text-brand-dark">YouTube</a>
        </div>
      </div>
      <p className="container-site flex flex-wrap justify-between gap-3 border-t border-line py-6 text-sm text-soft">
        <span>© {new Date().getFullYear()} Sabzi. Tous droits réservés.</span>
        <Link href="/mentions-legales" className="underline underline-offset-4 hover:text-brand-dark">Mentions légales</Link>
      </p>
    </footer>
  );
}
