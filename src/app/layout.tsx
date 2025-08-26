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
  title: "Sabzi - Agence Tech Charpentiers & Menuisiers",
  description: "Logiciels spécifiques, automatisation et IA pour charpentiers et menuisiers. Solutions sur-mesure à partir de 5000€.",
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
