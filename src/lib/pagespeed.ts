// PageSpeed Insights (Google) : vitesse et Core Web Vitals d'une page. Fonctionne sans clé, avec un quota réduit.
export type SpeedResult = {
  url: string;
  strategy: "mobile" | "desktop";
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  metrics: { label: string; value: string; status: "ok" | "warn" | "fail" }[];
  advice: string[];
};

const rate = (score: number | null | undefined): "ok" | "warn" | "fail" => (score == null ? "warn" : score >= 0.9 ? "ok" : score >= 0.5 ? "warn" : "fail");

export async function runPageSpeed(url: string, strategy: "mobile" | "desktop"): Promise<{ result: SpeedResult } | { error: string }> {
  try {
    const params = new URLSearchParams({ url, strategy, locale: "fr" });
    for (const c of ["performance", "seo", "accessibility"]) params.append("category", c);
    if (process.env.PAGESPEED_API_KEY) params.set("key", process.env.PAGESPEED_API_KEY);
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`, { cache: "no-store" });
    if (!res.ok) return { error: `PageSpeed a répondu ${res.status}. Vérifiez que l’adresse est publique${process.env.PAGESPEED_API_KEY ? "" : " ou ajoutez une clé PAGESPEED_API_KEY"}.` };
    const lh = (await res.json()).lighthouseResult;
    const audit = (id: string) => lh.audits?.[id];
    const pct = (id: string) => (lh.categories?.[id]?.score == null ? null : Math.round(lh.categories[id].score * 100));
    const metric = (id: string, label: string) => ({ label, value: audit(id)?.displayValue ?? "—", status: rate(audit(id)?.score) });
    const advice = Object.values(lh.audits as Record<string, { title: string; score: number | null; details?: { type?: string; overallSavingsMs?: number } }>)
      .filter((a) => a.details?.type === "opportunity" && (a.details.overallSavingsMs ?? 0) > 100)
      .sort((a, b) => (b.details!.overallSavingsMs ?? 0) - (a.details!.overallSavingsMs ?? 0))
      .slice(0, 6)
      .map((a) => a.title);
    return {
      result: {
        url,
        strategy,
        performance: pct("performance"),
        seo: pct("seo"),
        accessibility: pct("accessibility"),
        metrics: [
          metric("largest-contentful-paint", "Affichage principal (LCP)"),
          metric("total-blocking-time", "Blocage (TBT)"),
          metric("cumulative-layout-shift", "Stabilité visuelle (CLS)"),
          metric("first-contentful-paint", "Premier affichage (FCP)"),
          metric("speed-index", "Indice de vitesse"),
        ],
        advice,
      },
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}
