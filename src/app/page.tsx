// Landing page Sabzi - Agence Tech Charpentiers & Menuisiers
// Logiciels spécifiques, automatisation et IA sur-mesure
"use client"

import Image from "next/image";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExpectedResults from "@/components/ExpectedResults";
import TestimonialSection from "@/components/TestimonialSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectManagementSection from "@/components/ProjectManagementSection";
import PricingSection from "@/components/PricingSection";
import ThreeBackground from "@/components/ThreeBackground";


export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Three.js Animated Background */}
      <ThreeBackground />

      {/* Gradient overlay for depth */}
      <div className="fixed inset-0 -z-5 bg-gradient-to-br from-black/80 via-[#0f2112]/60 to-black/80 pointer-events-none" />

      {/* Header avec logo et liens sociaux */}
      <Header />

      {/* Section Hero avec H1, H2, H3, tag bulle et CTA */}
      <HeroSection />

      {/* Section Résultats attendus */}
      <ExpectedResults />

      {/* Section Processus - Notre Méthode (4 étapes) */}
      <ProcessSection />

      {/* Section Témoignages */}
      <TestimonialSection />

      {/* Section Gestion de Projet (approche sur-mesure) */}
      <ProjectManagementSection />

      {/* Section Tarification mise en avant */}
      <PricingSection />

      {/* Footer simple */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-arvo text-white mb-4">
              <Image
                src="/logo_blanc.png"
                alt="Logo Sabzi"
                width={100}
                height={100}
                className="inline mr-2"
              />
            </h3>
            <p className="text-white/80 font-inter max-w-2xl mx-auto">
              Agence tech & IA spécialisée dans le secteur de la construction{" "}
              <br></br>
              Logiciels sur-mesure, automatisation et IA pour professionnels.
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <p className="text-white/90 font-inter">
              📧 pro@syamakazadeh.com | 📞 +33 6 75 45 30 07
            </p>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/60 font-inter text-sm">
              &copy; 2025 Sabzi. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
