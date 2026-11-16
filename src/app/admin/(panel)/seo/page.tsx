import Link from "next/link";
import { asc } from "drizzle-orm";
import ActionForm, { SubmitButton } from "@/components/admin/ActionForm";
import { ScoreBadge } from "@/components/admin/ui";
import { getDb } from "@/db";
import { cities, keywords, media, posts } from "@/db/schema";
import { actionPlan, cityBlocks, postReport } from "@/lib/audit";
import { getGscData, gscConfigured, type GscTotals } from "@/lib/gsc";
import { addKeyword, deleteKeyword } from "../../actions";

export const metadata = { title: "Centre SEO" };

const nf = new Intl.NumberFormat("fr-FR");
const PRIORITY = { 1: { text: "Priorité 1", cls: "badge-fail" }, 2: { text: "Priorité 2", cls: "badge-warn" }, 3: { text: "Entretien", cls: "badge-neutral" } } as const;

function trend(cur: number, prev: number, lowerIsBetter = false) {
  if (!prev) return { text: "Pas de période de comparaison", cls: "text-muted" };
  const diff = ((cur - prev) / prev) * 100;
  const good = lowerIsBetter ? diff < 0 : diff > 0;
  return { text: `${diff > 0 ? "+" : ""}${diff.toFixed(0)} % sur 28 jours`, cls: Math.abs(diff) < 1 ? "text-muted" : good ? "text-[#14522c]" : "text-[#8c1d18]" };
}

function kpis(c: GscTotals, p: GscTotals) {
  return [
    { label: "Clics depuis Google", value: nf.format(c.clicks), t: trend(c.clicks, p.clicks) },
    { label: "Affichages", value: nf.format(c.impressions), t: trend(c.impressions, p.impressions) },
    { label: "Taux de clic", value: `${(c.ctr * 100).toFixed(1)} %`, t: trend(c.ctr, p.ctr) },
    { label: "Position moyenne", value: c.position ? c.position.toFixed(1) : "—", t: trend(c.position, p.position, true) },
  ];
}

export default async function SeoPage() {
  const db = getDb()!;
  const [allPosts, allCities, kw, allMedia] = await Promise.all([
    db.select().from(posts),
    db.select().from(cities).orderBy(asc(cities.position)),
    db.select().from(keywords).orderBy(asc(keywords.term)),
    db.select().from(media),
  ]);
  const gsc = gscConfigured() ? await getGscData() : null;
  const data = gsc && "data" in gsc ? gsc.data : null;
  const plan = actionPlan(allPosts, allCities, kw.length);
  const reports = allPosts.map((p) => ({ p, r: postReport(p) }));
  const published = reports.filter((x) => x.p.status === "published");
  const avg = published.length ? Math.round(published.reduce((a, x) => a + x.r.score, 0) / published.length) : null;
  const count = (id: string) => published.filter((x) => x.r.checks.some((c) => c.id === id && c.status === "fail")).length;
  const content = [
    { label: "Articles publiés", value: String(published.length), ok: published.length > 0 },
    { label: "Score moyen des articles", value: avg == null ? "—" : `${avg} / 100`, ok: avg != null && avg >= 80 },
    { label: "Articles sans meta description", value: String(count("meta_length")), ok: count("meta_length") === 0 },
    { label: "Articles avec image sans texte alternatif", value: String(count("img_alt")), ok: count("img_alt") === 0 },
    { label: "Articles trop courts", value: String(count("length")), ok: count("length") === 0 },
    { label: "Images dans la médiathèque", value: String(allMedia.length), ok: true },
  ];

  return (
    <>
      {/* Indicateurs Google */}
      {data ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis(data.current, data.previous).map((k) => (
              <div key={k.label} className="panel flex flex-col gap-1">
                <span className="text-sm text-muted">{k.label}</span>
                <span className="font-arvo text-[2rem] leading-tight">{k.value}</span>
                <span className={`text-[13px] font-semibold ${k.t.cls}`}>{k.t.text}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-soft">Source : Google Search Console, du {data.start} au {data.end}.</p>
        </>
      ) : (
        <section className="panel flex flex-col gap-2">
          <h2 className="text-lg font-bold">Google Search Console n’est pas connecté</h2>
          {gsc && "error" in gsc ? (
            <p className="text-[#8c1d18]">La connexion a échoué : {gsc.error}</p>
          ) : (
            <p className="text-muted">Les clics, les affichages et vos positions réelles sur Google s’afficheront ici une fois la connexion faite.</p>
          )}
          <ol className="list-decimal pl-5 text-sm text-muted">
            <li>Validez la propriété du site dans Google Search Console.</li>
            <li>Dans Google Cloud, créez un compte de service et activez l’API « Search Console ».</li>
            <li>Dans Search Console, ajoutez l’adresse e-mail du compte de service comme utilisateur du site.</li>
            <li>Renseignez les variables <code>GSC_SITE_URL</code>, <code>GSC_CLIENT_EMAIL</code> et <code>GSC_PRIVATE_KEY</code>, puis redéployez.</li>
          </ol>
        </section>
      )}

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr] xl:items-start">
        {/* Mots-clés suivis */}
        <section className="panel flex flex-col gap-4">
          <h2 className="text-lg font-bold">Mots-clés suivis</h2>
          {kw.length === 0 ? (
            <p className="text-muted">Ajoutez les requêtes sur lesquelles vous voulez apparaître, par exemple « logiciel sur mesure Avignon ».</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr>
                    <th className="th">Mot-clé</th>
                    <th className="th">Position</th>
                    <th className="th">Clics</th>
                    <th className="th">Affichages</th>
                    <th className="th">Page visée</th>
                    <th className="th"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {kw.map((k) => {
                    const row = data?.queries.find((q) => q.query.toLowerCase() === k.term);
                    return (
                      <tr key={k.id}>
                        <td className="td font-semibold">{k.term}</td>
                        <td className="td font-arvo text-lg">{row ? row.position.toFixed(1) : "—"}</td>
                        <td className="td">{row ? nf.format(row.clicks) : "—"}</td>
                        <td className="td">{row ? nf.format(row.impressions) : "—"}</td>
                        <td className="td text-muted">{k.targetPath || "—"}</td>
                        <td className="td">
                          <form action={deleteKeyword}>
                            <input type="hidden" name="id" value={k.id} />
                            <button type="submit" className="py-1 text-sm font-semibold underline underline-offset-4">Retirer</button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!data && kw.length > 0 && <p className="text-[13px] text-soft">Les positions s’afficheront une fois Google Search Console connecté.</p>}
          {data && <p className="text-[13px] text-soft">Un tiret signifie que Google n’a pas encore affiché le site sur cette requête.</p>}
          <ActionForm action={addKeyword} className="flex flex-col gap-3 border-t border-line pt-4">
            <div className="grid gap-3 sm:grid-cols-[2fr_2fr_auto] sm:items-end">
              <label className="label">Mot-clé<input name="term" required placeholder="logiciel sur mesure Avignon" className="input" /></label>
              <label className="label">Page visée<input name="targetPath" placeholder="/logiciel-site-web-avignon" className="input" /></label>
              <SubmitButton>Suivre</SubmitButton>
            </div>
          </ActionForm>
        </section>

        {/* Plan d'action */}
        <section className="panel flex flex-col gap-3">
          <h2 className="text-lg font-bold">Plan d’action</h2>
          {plan.length === 0 && <p className="text-muted">Rien à signaler.</p>}
          {plan.map((a) => (
            <Link key={a.title} href={a.href} className="flex flex-col gap-1 rounded-xl border border-line p-3.5 hover:border-brand">
              <span className="flex items-start justify-between gap-2">
                <span className="font-semibold">{a.title}</span>
                <span className={`badge ${PRIORITY[a.priority].cls}`}>{PRIORITY[a.priority].text}</span>
              </span>
              <span className="text-sm text-muted">{a.why}</span>
            </Link>
          ))}
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
        <section className="panel flex flex-col gap-1">
          <h2 className="mb-2 text-lg font-bold">Contenu</h2>
          {content.map((c) => (
            <div key={c.label} className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-0">
              <span>{c.label}</span>
              <span className="flex items-center gap-2 font-semibold">
                {c.value}
                <span className={`badge ${c.ok ? "badge-ok" : "badge-warn"}`}>{c.ok ? "Bon" : "À traiter"}</span>
              </span>
            </div>
          ))}
        </section>
        <section className="panel flex flex-col gap-1">
          <h2 className="mb-2 text-lg font-bold">SEO local</h2>
          {allCities.map((c) => {
            const b = cityBlocks(c);
            return (
              <Link key={c.id} href={`/admin/villes/${c.id}`} className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-0 hover:text-brand-dark">
                <span>{c.name}</span>
                <span className="flex items-center gap-2 text-sm">
                  {b.filled} bloc(s) sur 4
                  <span className={`badge ${c.status === "published" ? "badge-ok" : "badge-warn"}`}>{c.status === "published" ? "En ligne" : "Brouillon"}</span>
                </span>
              </Link>
            );
          })}
          <p className="pt-2 text-[13px] text-soft">À faire hors du site : créer votre fiche d’établissement Google à Avignon et demander un avis à chaque client.</p>
        </section>
      </div>

      {reports.length > 0 && (
        <section className="panel flex flex-col gap-3">
          <h2 className="text-lg font-bold">Score de chaque article</h2>
          {reports
            .sort((a, b) => a.r.score - b.r.score)
            .map(({ p, r }) => (
              <Link key={p.id} href={`/admin/articles/${p.id}`} className="flex items-center justify-between gap-3 border-b border-line py-2 last:border-0 hover:text-brand-dark">
                <span>{p.title}</span>
                <ScoreBadge score={r.score} />
              </Link>
            ))}
        </section>
      )}
    </>
  );
}
