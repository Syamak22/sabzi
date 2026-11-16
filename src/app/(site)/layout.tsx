import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  );
}
