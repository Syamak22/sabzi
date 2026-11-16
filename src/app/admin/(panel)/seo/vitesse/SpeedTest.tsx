"use client";

import { useActionState } from "react";
import { submitWithoutReset } from "@/components/admin/ActionForm";
import { testSpeed } from "../../../actions";

const TAG = { ok: { text: "Bon", cls: "badge-ok" }, warn: { text: "À améliorer", cls: "badge-warn" }, fail: { text: "À corriger", cls: "badge-fail" } };
const scoreCls = (n: number | null) => (n == null ? "badge-neutral" : n >= 90 ? "badge-ok" : n >= 50 ? "badge-warn" : "badge-fail");

export default function SpeedTest({ paths }: { paths: string[] }) {
  const [state, action, pending] = useActionState(testSpeed, null);
  const r = state?.result;
  return (
    <>
      <form action={action} onSubmit={(e) => submitWithoutReset(e, action)} className="panel flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-[3fr_1fr_auto] sm:items-end">
          <label className="label">
            Page à tester
            <select name="path" className="input">
              {paths.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="label">
            Appareil
            <select name="strategy" className="input">
              <option value="mobile">Mobile</option>
              <option value="desktop">Ordinateur</option>
            </select>
          </label>
          <button type="submit" disabled={pending} className="btn-admin">{pending ? "Test en cours…" : "Lancer le test"}</button>
        </div>
        <p className="hint">Le test dure 20 à 40 secondes. Il ne fonctionne que sur le site en ligne : Google doit pouvoir ouvrir la page.</p>
      </form>
      {state?.error && <p role="alert" className="rounded-xl bg-[#fbe0dd] px-4 py-3 text-[#8c1d18]">{state.error}</p>}
      {r && (
        <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
          <section className="panel flex flex-col gap-3">
            <h2 className="text-lg font-bold">Résultat · {r.strategy === "mobile" ? "mobile" : "ordinateur"}</h2>
            <p className="text-sm text-muted">{r.url}</p>
            {[["Performance", r.performance], ["SEO technique", r.seo], ["Accessibilité", r.accessibility]].map(([label, n]) => (
              <div key={label as string} className="flex items-center justify-between border-b border-line py-2 last:border-0">
                <span>{label}</span>
                <span className={`badge ${scoreCls(n as number | null)}`}>{n == null ? "—" : `${n} / 100`}</span>
              </div>
            ))}
          </section>
          <section className="panel flex flex-col gap-1">
            <h2 className="mb-2 text-lg font-bold">Mesures</h2>
            {r.metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between gap-3 border-b border-line py-2 last:border-0">
                <span>{m.label}</span>
                <span className="flex items-center gap-2 font-semibold">{m.value}<span className={`badge ${TAG[m.status].cls}`}>{TAG[m.status].text}</span></span>
              </div>
            ))}
          </section>
          {r.advice.length > 0 && (
            <section className="panel flex flex-col gap-2 xl:col-span-2">
              <h2 className="text-lg font-bold">Corrections proposées par Google</h2>
              <ul className="list-disc pl-5 text-muted">
                {r.advice.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </>
  );
}
