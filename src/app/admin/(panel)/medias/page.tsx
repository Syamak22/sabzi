import { desc } from "drizzle-orm";
import ActionForm, { ConfirmButton, SubmitButton } from "@/components/admin/ActionForm";
import CopyButton from "@/components/admin/CopyButton";
import { PageHeader } from "@/components/admin/ui";
import { getDb } from "@/db";
import { media } from "@/db/schema";
import { deleteMedia, uploadMedia } from "../../actions";

export const metadata = { title: "Médias" };

export default async function MediaPage() {
  const rows = await getDb()!.select().from(media).orderBy(desc(media.createdAt));
  return (
    <>
      <PageHeader title="Médias" text="Les images des articles, des réalisations et des pages locales." />
      <ActionForm action={uploadMedia} className="panel flex max-w-3xl flex-col gap-4">
        <h2 className="text-lg font-bold">Ajouter une image</h2>
        <label className="label">
          Fichier
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" required className="input !py-2" />
          <span className="hint">JPG, PNG, WebP, GIF ou AVIF, 5 Mo maximum. Préférez le WebP, sous 300 Ko : la vitesse compte pour le référencement.</span>
        </label>
        <label className="label">
          Texte alternatif
          <input name="alt" required className="input" />
          <span className="hint">Décrivez ce que montre l’image, en une phrase. Il sert aussi à nommer le fichier.</span>
        </label>
        <div className="flex"><SubmitButton>Envoyer</SubmitButton></div>
      </ActionForm>
      {rows.length === 0 ? (
        <p className="text-muted">Aucune image pour l’instant.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((m) => (
            <article key={m.id} className="panel flex flex-col gap-3 !p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/media/${m.filename}`} alt={m.alt} loading="lazy" className="h-44 w-full rounded-xl bg-ground object-contain" />
              <p className="text-sm">{m.alt}</p>
              <p className="text-xs text-soft">/media/{m.filename} · {Math.round(m.size / 1024)} Ko</p>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={`/media/${m.filename}`} label="Copier l’adresse" />
                <CopyButton text={`![${m.alt}](/media/${m.filename})`} label="Copier pour un article" />
              </div>
              <form action={deleteMedia}>
                <input type="hidden" name="id" value={m.id} />
                <ConfirmButton message="Supprimer cette image ? Les pages qui l’utilisent afficheront une image manquante.">Supprimer</ConfirmButton>
              </form>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
