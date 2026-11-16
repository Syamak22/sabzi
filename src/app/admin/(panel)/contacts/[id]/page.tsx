import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ActionForm, { ConfirmButton, SubmitButton } from "@/components/admin/ActionForm";
import { STAGES } from "@/lib/stages";
import { PageHeader } from "@/components/admin/ui";
import { getDb } from "@/db";
import { contacts } from "@/db/schema";
import { formatDate } from "@/lib/markdown";
import { deleteContact, saveContact } from "../../../actions";

export const metadata = { title: "Contact" };

export default async function ContactEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let c = null;
  if (id !== "nouveau") {
    [c] = await getDb()!.select().from(contacts).where(eq(contacts.id, Number(id) || 0)).limit(1);
    if (!c) notFound();
  }
  return (
    <>
      <PageHeader title={c ? c.name : "Nouveau contact"} text={c ? `Reçu le ${formatDate(c.createdAt)}${c.source ? ` · ${c.source}` : ""}` : undefined}>
        {c && <a href={`mailto:${c.email}`} className="btn-quiet">Répondre par e-mail</a>}
      </PageHeader>
      {c && (
        <section className="panel flex max-w-3xl flex-col gap-2">
          <h2 className="font-bold">Message</h2>
          <p className="whitespace-pre-wrap text-muted">{c.message}</p>
        </section>
      )}
      <ActionForm action={saveContact} className="flex max-w-3xl flex-col gap-5">
        {c && <input type="hidden" name="id" value={c.id} />}
        <div className="panel flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label">Nom<input name="name" defaultValue={c?.name} required className="input" /></label>
            <label className="label">E-mail<input name="email" type="email" defaultValue={c?.email} required className="input" /></label>
            <label className="label">Entreprise<input name="company" defaultValue={c?.company} className="input" /></label>
            <label className="label">Téléphone<input name="phone" type="tel" defaultValue={c?.phone} className="input" /></label>
          </div>
          <label className="label">
            Étape
            <select name="stage" defaultValue={c?.stage ?? "nouveau"} className="input">
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
          {!c && <label className="label">Besoin exprimé<textarea name="message" rows={3} className="input" /></label>}
          <label className="label">
            Notes internes
            <textarea name="notes" defaultValue={c?.notes} rows={6} className="input" />
            <span className="hint">Comptes rendus d’appel, prochaine action, montant du devis…</span>
          </label>
        </div>
        <div className="flex"><SubmitButton>Enregistrer</SubmitButton></div>
      </ActionForm>
      {c && (
        <form action={deleteContact}>
          <input type="hidden" name="id" value={c.id} />
          <ConfirmButton message="Supprimer définitivement ce contact ?">Supprimer le contact</ConfirmButton>
        </form>
      )}
    </>
  );
}
