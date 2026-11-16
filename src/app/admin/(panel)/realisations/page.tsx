import Link from "next/link";
import { asc } from "drizzle-orm";
import { Empty, PageHeader, StatusBadge } from "@/components/admin/ui";
import { getDb } from "@/db";
import { projects } from "@/db/schema";

export const metadata = { title: "Réalisations" };

export default async function ProjectsPage() {
  const rows = await getDb()!.select().from(projects).orderBy(asc(projects.position));
  return (
    <>
      <PageHeader title="Réalisations" text="Les projets affichés sur la page d’accueil.">
        <Link href="/admin/realisations/nouveau" className="btn-admin">Nouvelle réalisation</Link>
      </PageHeader>
      {rows.length === 0 ? (
        <Empty text="Aucune réalisation." href="/admin/realisations/nouveau" cta="Ajouter une réalisation" />
      ) : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr><th className="th">Titre</th><th className="th">Client</th><th className="th">Ordre</th><th className="th">État</th></tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td className="td font-semibold"><Link href={`/admin/realisations/${p.id}`} className="underline underline-offset-4 hover:text-brand-dark">{p.title}</Link></td>
                  <td className="td text-muted">{p.clientName || "—"}</td>
                  <td className="td text-muted">{p.position}</td>
                  <td className="td"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
