import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#methode", label: "Méthode" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="container-site flex flex-wrap items-center justify-between gap-4 py-6">
      <Link href="/" aria-label="Sabzi, accueil">
        <Image src="/logo_orange.png" alt="Sabzi" width={334} height={130} priority className="h-9 w-auto" />
      </Link>
      <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-x-7 gap-y-1 text-[15px] font-medium">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="py-3 hover:text-brand-dark">
            {l.label}
          </Link>
        ))}
        <a href={site.booking} className="btn-primary !min-h-11 !px-5 !py-2 text-[15px] !font-semibold">
          Programmer une réunion
        </a>
      </nav>
    </header>
  );
}
