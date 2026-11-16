import Link from "next/link";
import { desc } from "drizzle-orm";
import { Empty, PageHeader, ScoreBadge, StatusBadge } from "@/components/admin/ui";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { postReport } from "@/lib/audit";
import { formatDate } from "@/lib/markdown";

export const metadata = { title: "Articles" };

export default async function PostsPage() {
  const rows = await getDb()!.select().from(posts).orderBy(desc(posts.updatedAt));
  return (
    <>
      <PageHeader title="Articles" text="Chaque article est noté selon les règles SEO pendant la rédaction.">
        <Link href="/admin/articles/nouveau" className="btn-admin">Nouvel article</Link>
      </PageHeader>
      {rows.length === 0 ? (
        <Empty text="Aucun article pour l’instant." href="/admin/articles/nouveau" cta="Écrire le premier article" />
      ) : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="th">Titre</th>
                <th className="th">Mot-clé</th>
                <th className="th">État</th>
                <th className="th">Score SEO</th>
                <th className="th">Modifié le</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td className="td font-semibold">
                    <Link href={`/admin/articles/${p.id}`} className="underline underline-offset-4 hover:text-brand-dark">{p.title}</Link>
                  </td>
                  <td className="td text-muted">{p.focusKeyword || "—"}</td>
                  <td className="td"><StatusBadge status={p.status} /></td>
                  <td className="td"><ScoreBadge score={postReport(p).score} /></td>
                  <td className="td text-muted">{formatDate(p.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
