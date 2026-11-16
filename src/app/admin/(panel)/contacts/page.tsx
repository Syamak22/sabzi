import Link from "next/link";
import { desc } from "drizzle-orm";
import StageSelect from "@/components/admin/StageSelect";
import { STAGES } from "@/lib/stages";
import { PageHeader } from "@/components/admin/ui";
import { getDb } from "@/db";
import { contacts } from "@/db/schema";
import { formatDate } from "@/lib/markdown";
import { setContactStage } from "../../actions";

export const metadata = { title: "Contacts" };

export default async function ContactsPage() {
  const rows = await getDb()!.select().from(contacts).orderBy(desc(contacts.createdAt));
  return (
    <>
      <PageHeader title="Contacts" text="Chaque message du site crée une fiche. Faites-la avancer d’étape en étape.">
        <Link href="/admin/contacts/nouveau" className="btn-admin">Ajouter un contact</Link>
      </PageHeader>
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[1180px] items-start gap-4">
          {STAGES.map((s) => {
            const cards = rows.filter((c) => c.stage === s.id);
            return (
              <section key={s.id} className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl bg-[#f5eee9] p-3.5">
                <div className="flex items-center justify-between px-1">
                  <h2 className="font-bold">{s.label}</h2>
                  <span className="text-sm font-semibold text-muted">{cards.length}</span>
                </div>
                {cards.map((c) => (
                  <article key={c.id} className="flex flex-col gap-1.5 rounded-xl border border-line bg-white p-3.5">
                    <Link href={`/admin/contacts/${c.id}`} className="font-semibold underline underline-offset-4 hover:text-brand-dark">{c.name}</Link>
                    {c.company && <span className="text-[13px] text-muted">{c.company}</span>}
                    <span className="line-clamp-3 text-[13px]">{c.message}</span>
                    <span className="text-xs text-soft">{formatDate(c.createdAt)}{c.source && ` · ${c.source}`}</span>
                    <StageSelect id={c.id} stage={c.stage} name={c.name} onChange={setContactStage} />
                  </article>
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
