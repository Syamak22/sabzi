import Link from "next/link";
import { asc } from "drizzle-orm";
import ActionForm, { SubmitButton } from "@/components/admin/ActionForm";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { getDb } from "@/db";
import { cities } from "@/db/schema";
import { cityBlocks } from "@/lib/audit";
import { CITY_PREFIX } from "@/lib/site";
import { addCity } from "../../actions";

export const metadata = { title: "Pages locales" };

export default async function CitiesPage() {
  const rows = await getDb()!.select().from(cities).orderBy(asc(cities.position));
  return (
    <>
      <PageHeader title="Pages locales" text="Un seul modèle pour toutes les villes. Seuls les blocs uniques sont à rédiger pour chacune." />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr] xl:items-start">
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                <th className="th">Ville</th>
                <th className="th">Blocs uniques</th>
                <th className="th">Mots propres à la ville</th>
                <th className="th">État</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const b = cityBlocks(c);
                return (
                  <tr key={c.id}>
                    <td className="td">
                      <Link href={`/admin/villes/${c.id}`} className="font-semibold underline underline-offset-4 hover:text-brand-dark">{c.name}</Link>
                      <span className="block text-xs text-soft">/{CITY_PREFIX}{c.slug}</span>
                    </td>
                    <td className="td">
                      <span className={`badge ${b.filled === 4 ? "badge-ok" : b.filled > 0 ? "badge-warn" : "badge-fail"}`}>{b.filled} sur 4</span>
                    </td>
                    <td className="td text-muted">{b.uniqueWords}</td>
                    <td className="td"><StatusBadge status={c.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-6">
          <section className="panel flex flex-col gap-3">
            <h2 className="text-lg font-bold">Ajouter une ville</h2>
            <ActionForm action={addCity} className="flex flex-col gap-4">
              <label className="label">Ville<input name="name" required className="input" /></label>
              <label className="label">Département<input name="department" className="input" /></label>
              <SubmitButton>Ajouter</SubmitButton>
            </ActionForm>
          </section>
          <section className="panel flex flex-col gap-2 text-sm text-muted">
            <h2 className="text-lg font-bold text-ink">Comment ça marche</h2>
            <p><strong className="text-ink">Blocs communs</strong> : titre, services, méthode, témoignages, questions fréquentes. Le nom de la ville s’y insère seul.</p>
            <p><strong className="text-ink">Blocs uniques</strong> : contexte local, communes voisines, cas d’usage, une question propre à la ville.</p>
            <p>Une page ne peut être publiée que si ses 4 blocs uniques sont remplis : deux pages presque identiques ne sont pas indexées par Google.</p>
          </section>
        </div>
      </div>
    </>
  );
}
