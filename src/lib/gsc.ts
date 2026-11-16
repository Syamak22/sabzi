// Google Search Console : clics, affichages et positions réels. Nécessite un compte de service Google.
import { createSign } from "node:crypto";

export type GscRow = { query: string; clicks: number; impressions: number; ctr: number; position: number };
export type GscTotals = { clicks: number; impressions: number; ctr: number; position: number };
export type GscData = { current: GscTotals; previous: GscTotals; queries: GscRow[]; start: string; end: string };

export function gscConfigured(): boolean {
  return Boolean(process.env.GSC_SITE_URL && process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY);
}

async function accessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: process.env.GSC_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const key = process.env.GSC_PRIVATE_KEY!.replace(/\\n/g, "\n");
  const signature = createSign("RSA-SHA256").update(unsigned).sign(key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Authentification Google refusée (${res.status})`);
  return (await res.json()).access_token;
}

const day = (offset: number) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);

async function query(token: string, body: object) {
  const site = encodeURIComponent(process.env.GSC_SITE_URL!);
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Search Console a répondu ${res.status}`);
  return (await res.json()).rows ?? [];
}

const totals = (rows: { clicks: number; impressions: number; ctr: number; position: number }[]): GscTotals =>
  rows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };

// Les données de Google ont environ 3 jours de retard : on compare 28 jours aux 28 jours précédents.
export async function getGscData(): Promise<{ data: GscData } | { error: string }> {
  try {
    const token = await accessToken();
    const [end, start, prevEnd, prevStart] = [day(3), day(30), day(31), day(58)];
    const [cur, prev, queries] = await Promise.all([
      query(token, { startDate: start, endDate: end }),
      query(token, { startDate: prevStart, endDate: prevEnd }),
      query(token, { startDate: start, endDate: end, dimensions: ["query"], rowLimit: 500 }),
    ]);
    return {
      data: {
        current: totals(cur),
        previous: totals(prev),
        start,
        end,
        queries: queries.map((r: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }) => ({
          query: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
      },
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}
