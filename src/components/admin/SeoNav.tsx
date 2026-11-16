"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin/seo", label: "Vue d’ensemble" },
  { href: "/admin/seo/vitesse", label: "Test de vitesse" },
  { href: "/admin/seo/lecons", label: "Apprendre" },
];

export default function SeoNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Rubriques du centre SEO" className="flex flex-wrap gap-2 font-semibold">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link key={t.href} href={t.href} aria-current={active ? "page" : undefined} className={`rounded-full px-[18px] py-2.5 ${active ? "bg-ink text-white" : "border border-line-strong bg-white hover:border-ink"}`}>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
