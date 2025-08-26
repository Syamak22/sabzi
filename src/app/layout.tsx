import type { Metadata } from "next";
import { Arvo, Inter } from "next/font/google";
import "./globals.css";

// Arvo pour les titres H1 et H2
const arvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  weight: ["400"], // Regular seulement
});

// Inter pour le body et sous-titres
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabzi - Agence tech & IA dédiée aux entreprises de la construction",
  description: "Logiciels spécifiques, automatisation et IA.",
  keywords:
    "tech, IA, construction, automatisation, logiciels, entreprise, digital, BTP",
  openGraph: {
    title: "Sabzi - Agence tech & IA",
    description: "Solutions tech dédiées à la construction",
    url: "https://sabzi.tech",
    siteName: "Sabzi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${arvo.variable} ${inter.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
