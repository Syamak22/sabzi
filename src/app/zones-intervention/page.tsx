import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "@/components/Sections";
import { getCities } from "@/lib/queries";
import { CITY_PREFIX, site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Zones d’intervention",
  description: `Sabzi est basé à ${site.city} et se déplace dans vos locaux pour cadrer votre projet de logiciel sur mesure, d’automatisation ou de site web.`,
  alternates: { canonical: "/zones-intervention" },
};

export default async function ZonesPage() {
  const cities = await getCities();
  return (
    <>
      <section className="container-site flex flex-col gap-10 pb-8 pt-10">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="h-display">Zones d’intervention</h1>
          <p className="text-xl text-muted">
            Je suis basé à {site.city}. La première réunion a lieu dans vos locaux : aucune solution n’est proposée sans avoir rencontré vos équipes.
          </p>
        </div>
        {cities.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((c) => (
              <Link key={c.id} href={`/${CITY_PREFIX}${c.slug}`} className="card flex flex-col gap-1 !rounded-[20px] p-6 transition hover:border-brand">
                <span className="font-arvo text-2xl">{c.name}</span>
                <span className="text-[15px] text-muted">{c.department}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
      <CallToAction />
    </>
  );
}
