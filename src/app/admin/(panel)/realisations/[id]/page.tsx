import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ActionForm, { ConfirmButton, SubmitButton } from "@/components/admin/ActionForm";
import { PageHeader, Saved } from "@/components/admin/ui";
import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { deleteProject, saveProject } from "../../../actions";

export const metadata = { title: "Réalisation" };

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string }> };

export default async function ProjectEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  let p = null;
  if (id !== "nouveau") {
    [p] = await getDb()!.select().from(projects).where(eq(projects.id, Number(id) || 0)).limit(1);
    if (!p) notFound();
  }
  return (
    <>
      <PageHeader title={p ? "Modifier la réalisation" : "Nouvelle réalisation"} text="N’ajoutez que des projets réels, avec l’accord du client." />
      <Saved show={(await searchParams).ok === "1"} />
      <ActionForm action={saveProject} className="flex max-w-3xl flex-col gap-5">
        {p && <input type="hidden" name="id" value={p.id} />}
        <div className="panel flex flex-col gap-4">
          <label className="label">Titre<input name="title" defaultValue={p?.title} required className="input" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label">Client<input name="clientName" defaultValue={p?.clientName} className="input" /></label>
            <label className="label">Type de projet<input name="serviceType" defaultValue={p?.serviceType} placeholder="Application métier, automatisation, site web…" className="input" /></label>
          </div>
          <label className="label">
            Résumé
            <textarea name="summary" defaultValue={p?.summary} rows={4} className="input" />
            <span className="hint">Le problème du client, ce qui a été construit, le résultat.</span>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label">Image (adresse)<input name="coverImageUrl" defaultValue={p?.coverImageUrl} placeholder="/media/…" className="input" /></label>
            <label className="label">Texte alternatif de l’image<input name="coverImageAlt" defaultValue={p?.coverImageAlt} className="input" /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label">Ordre d’affichage<input name="position" type="number" defaultValue={p?.position ?? 0} className="input" /></label>
            <label className="flex items-center gap-3 self-end py-2.5 font-semibold">
              <input type="checkbox" name="published" defaultChecked={p?.status === "published"} className="h-5 w-5" />
              Afficher sur le site
            </label>
          </div>
        </div>
        <div className="flex"><SubmitButton>Enregistrer</SubmitButton></div>
      </ActionForm>
      {p && (
        <form action={deleteProject}>
          <input type="hidden" name="id" value={p.id} />
          <ConfirmButton message="Supprimer définitivement cette réalisation ?">Supprimer la réalisation</ConfirmButton>
        </form>
      )}
    </>
  );
}
