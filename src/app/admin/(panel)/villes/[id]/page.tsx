import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ActionForm, { ConfirmButton, SubmitButton } from "@/components/admin/ActionForm";
import { PageHeader, Saved, StatusBadge } from "@/components/admin/ui";
import { getDb } from "@/db";
import { cities } from "@/db/schema";
import { cityBlocks } from "@/lib/audit";
import { CITY_PREFIX } from "@/lib/site";
import { deVille } from "@/lib/villes";
import { deleteCity, saveCity } from "../../../actions";

export const metadata = { title: "Page locale" };

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string }> };

export default async function CityEditPage({ params, searchParams }: Props) {
  const [c] = await getDb()!.select().from(cities).where(eq(cities.id, Number((await params).id) || 0)).limit(1);
  if (!c) notFound();
  const b = cityBlocks(c);
  const published = c.status === "published";
  return (
    <>
      <PageHeader title={`Page locale : ${c.name}`} text={`/${CITY_PREFIX}${c.slug} · titre : « Logiciel sur mesure et site web pour PME ${deVille(c.name)} »`}>
        <StatusBadge status={c.status} />
        {published && <Link href={`/${CITY_PREFIX}${c.slug}`} target="_blank" className="btn-quiet">Voir en ligne</Link>}
      </PageHeader>
      <Saved show={(await searchParams).ok === "1"} />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr] xl:items-start">
        <ActionForm action={saveCity} className="flex flex-col gap-5">
          <input type="hidden" name="id" value={c.id} />
          <div className="panel grid gap-4 sm:grid-cols-2">
            <label className="label">Ville<input name="name" defaultValue={c.name} required className="input" /></label>
            <label className="label">Département<input name="department" defaultValue={c.department} className="input" /></label>
          </div>
          <div className="panel flex flex-col gap-4">
            <h2 className="text-lg font-bold">1. Contexte local</h2>
            <label className="label">
              Les PME {deVille(c.name)} et leurs outils
              <textarea name="contextMd" defaultValue={c.contextMd} rows={8} className="input" />
              <span className="hint">80 mots minimum. Secteurs présents, zones d’activité, problèmes d’outils rencontrés sur place. Faits vérifiables uniquement (INSEE, CCI, site de la commune).</span>
            </label>
          </div>
          <div className="panel flex flex-col gap-4">
            <h2 className="text-lg font-bold">2. Communes voisines</h2>
            <label className="label">
              Autour de {c.name}
              <textarea name="nearbyMd" defaultValue={c.nearbyMd} rows={3} className="input" />
              <span className="hint">Communes desservies et temps de trajet depuis Avignon.</span>
            </label>
          </div>
          <div className="panel flex flex-col gap-4">
            <h2 className="text-lg font-bold">3. Cas d’usage</h2>
            <label className="label">
              Titre
              <input name="useCaseTitle" defaultValue={c.useCaseTitle} className="input" />
              <span className="hint">Un besoin typique d’un secteur réellement présent dans la ville.</span>
            </label>
            <label className="label">
              Description
              <textarea name="useCaseMd" defaultValue={c.useCaseMd} rows={6} className="input" />
              <span className="hint">40 mots minimum. Le problème, puis l’outil que vous construiriez. À présenter comme un exemple, jamais comme un client.</span>
            </label>
          </div>
          <div className="panel flex flex-col gap-4">
            <h2 className="text-lg font-bold">4. Question propre à la ville</h2>
            <label className="label">Question<input name="faqQuestion" defaultValue={c.faqQuestion} className="input" /></label>
            <label className="label">Réponse<textarea name="faqAnswer" defaultValue={c.faqAnswer} rows={3} className="input" /></label>
          </div>
          <div className="panel flex flex-col gap-4">
            <h2 className="text-lg font-bold">Référencement</h2>
            <label className="label">
              Meta description
              <textarea name="metaDescription" defaultValue={c.metaDescription} rows={2} className="input" />
              <span className="hint">120 à 160 caractères. Laissez vide pour utiliser la description par défaut.</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <SubmitButton variant="quiet">Enregistrer</SubmitButton>
            {published ? <SubmitButton intent="unpublish" variant="quiet">Repasser en brouillon</SubmitButton> : <SubmitButton intent="publish">Publier</SubmitButton>}
          </div>
        </ActionForm>
        <div className="flex flex-col gap-6">
          <section className="panel flex flex-col gap-3">
            <h2 className="text-lg font-bold">Avancement</h2>
            {b.blocks.map((x) => (
              <div key={x.label} className="flex items-center justify-between gap-2">
                <span>{x.label}</span>
                <span className={`badge ${x.done ? "badge-ok" : "badge-fail"}`}>{x.done ? "Rempli" : "À rédiger"}</span>
              </div>
            ))}
            <p className="text-sm text-muted">{b.uniqueWords} mots propres à cette ville.</p>
          </section>
          <form action={deleteCity}>
            <input type="hidden" name="id" value={c.id} />
            <ConfirmButton message={`Supprimer définitivement la page ${c.name} ?`}>Supprimer la ville</ConfirmButton>
          </form>
        </div>
      </div>
    </>
  );
}
