"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/lib/site";

export default function ServiceTabs({ services }: { services: Service[] }) {
  const [picked, setPicked] = useState(services[0].slug);
  const current = services.find((s) => s.slug === picked) ?? services[0];
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div role="tablist" aria-label="Services" className="flex flex-col gap-3 lg:w-1/3">
        {services.map((s) => {
          const selected = s.slug === picked;
          return (
            <button
              key={s.slug}
              role="tab"
              type="button"
              id={`tab-${s.slug}`}
              aria-selected={selected}
              aria-controls="service-panel"
              onClick={() => setPicked(s.slug)}
              className={`flex flex-col gap-1 rounded-2xl border-[1.5px] px-6 py-5 text-left transition ${
                selected ? "border-brand bg-ground" : "border-line-strong bg-white hover:border-[#d9ccc4]"
              }`}
            >
              <span className="text-[19px] font-semibold">{s.label}</span>
              <span className="text-[15px] text-muted">{s.hint}</span>
            </button>
          );
        })}
      </div>
      <div id="service-panel" role="tabpanel" aria-labelledby={`tab-${current.slug}`} className="flex flex-1 flex-col gap-6 rounded-3xl bg-ground p-7 sm:p-10">
        <h3 className="font-arvo text-[1.7rem] leading-tight">{current.title}</h3>
        <p className="text-muted">{current.text}</p>
        <ul className="flex flex-col gap-3.5">
          {current.points.map((p) => (
            <li key={p} className="flex items-start gap-3.5">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b8401c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2.5">
          {current.examples.map((e) => (
            <span key={e} className="rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-medium">
              {e}
            </span>
          ))}
        </div>
        <Link href={`/${current.slug}`} className="link-arrow self-start">
          En savoir plus sur {current.label.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}
