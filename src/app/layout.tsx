import type { Metadata } from "next";
import { Arvo, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const arvo = Arvo({ variable: "--font-arvo-raw", subsets: ["latin"], weight: ["400"], display: "swap" });
const inter = Inter({ variable: "--font-inter-raw", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.title} | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: `${site.title} | ${site.name}`,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${arvo.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
