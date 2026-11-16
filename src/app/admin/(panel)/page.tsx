import Link from "next/link";
import { desc } from "drizzle-orm";
import { PageHeader } from "@/components/admin/ui";
import { getDb } from "@/db";
import { cities, contacts, keywords, posts } from "@/db/schema";
import { actionPlan } from "@/lib/audit";
import { formatDate } from "@/lib/markdown";

export const metadata = { title: "Tableau de bord" };

export default async function Dashboard() {
  const db = getDb()!;
  const [allPosts, allCities, allContacts, kw] = await Promise.all([
    db.select().from(posts),
    db.select().from(cities),
    db.select().from(contacts).orderBy(desc(contacts.createdAt)),
    db.select().from(keywords),
  ]);
  const plan = actionPlan(allPosts, allCities, kw.length);
  const stats = [
    { label: "Articles publiés", value: allPosts.filter((p) => p.status === "published").length, sub: `${allPosts.filter((p) => p.status !== "published").length} brouillon(s)`, href: "/admin/articles" },
    { label: "Pages locales en ligne", value: allCities.filter((c) => c.status === "published").length, sub: `sur ${allCities.length} ville(s)`, href: "/admin/villes" },
    { label: "Nouveaux contacts", value: allContacts.filter((c) => c.stage === "nouveau").length, sub: `${allContacts.length} au total`, href: "/admin/contacts" },
    { label: "Actions SEO à mener", value: plan.length, sub: `${plan.filter((a) => a.priority === 1).length} prioritaire(s)`, href: "/admin/seo" },
  ];
  return (
    <>
      <PageHeader title="Tableau de bord" text="L’état du site en un coup d’œil." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="panel flex flex-col gap-1 transition hover:border-brand">
            <span className="text-sm text-muted">{s.label}</span>
            <span className="font-arvo text-[2rem] leading-tight">{s.value}</span>
            <span className="text-[13px] text-soft">{s.sub}</span>
          </Link>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="panel flex flex-col gap-3">
          <h2 className="text-lg font-bold">À faire en priorité</h2>
          {plan.length === 0 && <p className="text-muted">Rien à signaler.</p>}
          {plan.slice(0, 5).map((a) => (
            <Link key={a.title} href={a.href} className="flex flex-col gap-0.5 rounded-xl border border-line p-3.5 hover:border-brand">
              <span className="font-semibold">{a.title}</span>
              <span className="text-sm text-muted">{a.why}</span>
            </Link>
          ))}
        </section>
        <section className="panel flex flex-col gap-3">
          <h2 className="text-lg font-bold">Derniers contacts</h2>
          {allContacts.length === 0 && <p className="text-muted">Aucun message reçu pour l’instant.</p>}
          {allContacts.slice(0, 5).map((c) => (
            <Link key={c.id} href={`/admin/contacts/${c.id}`} className="flex flex-col gap-0.5 rounded-xl border border-line p-3.5 hover:border-brand">
              <span className="font-semibold">
                {c.name}
                {c.company && <span className="font-normal text-muted"> · {c.company}</span>}
              </span>
              <span className="line-clamp-1 text-sm text-muted">{c.message}</span>
              <span className="text-xs text-soft">{formatDate(c.createdAt)}</span>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
