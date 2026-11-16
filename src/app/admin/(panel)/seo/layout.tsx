import SeoNav from "@/components/admin/SeoNav";
import { PageHeader } from "@/components/admin/ui";

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Centre SEO" text="Objectif : première position à Avignon, puis Nîmes, Aix-en-Provence et Montpellier." />
      <SeoNav />
      {children}
    </>
  );
}
