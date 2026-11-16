"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Tableau de bord", exact: true },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/villes", label: "Pages locales" },
  { href: "/admin/realisations", label: "Réalisations" },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/medias", label: "Médias" },
  { href: "/admin/seo", label: "Centre SEO" },
];

export default function Sidebar({ email, logout, unread }: { email: string; logout: () => Promise<void>; unread: number }) {
  const pathname = usePathname();
  return (
    <aside className="flex shrink-0 flex-col gap-5 border-b border-line bg-white px-4 py-5 lg:min-h-screen lg:w-[250px] lg:border-b-0 lg:border-r">
      <Link href="/admin" className="px-3">
        <Image src="/logo_orange.png" alt="Sabzi, back-office" width={334} height={130} className="h-8 w-auto" />
      </Link>
      <nav aria-label="Back-office" className="flex flex-wrap gap-1 font-medium lg:flex-col">
        {items.map((it) => {
          const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 ${active ? "bg-peach font-bold" : "hover:bg-ground"}`}
            >
              {it.label}
              {it.href === "/admin/contacts" && unread > 0 && <span className="badge badge-fail">{unread}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col gap-2 border-t border-line pt-4 text-sm lg:mt-auto">
        <Link href="/" target="_blank" className="px-3 py-1.5 underline underline-offset-4">
          Voir le site
        </Link>
        <span className="truncate px-3 text-muted">{email}</span>
        <form action={logout} className="px-3">
          <button type="submit" className="py-1.5 font-semibold underline underline-offset-4">
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  );
}
