"use client";
import { useState } from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "OvlhsVOPSTM";

  const getThumbnail = (videoId: string) => {
    // Pour les Shorts, utilise la meilleure qualité disponible
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <section className="py-12 px-6 lg:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne de gauche - Contenu Hero */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge secteur */}
            <div className="mb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="text-sm">🏗️</span>
                <span className="text-white text-sm font-inter font-medium">
                  Entreprises de la construction
                </span>
              </div>
            </div>

            {/* H1 - Titre principal */}
            <h1 className="heading-1">
              <span className="font-bold italic">Sécurisez</span> vos marges
              <br />
              <span className="font-bold italic">Optimisez</span> vos planning
              <br />
              <span className="font-bold italic">Facilitez</span> la gestion de
              vos équipes
            </h1>

            {/* Description principale */}
            <p className="text-description max-w-lg mx-auto lg:mx-0">
              Automatisations et logiciels spécifiques qui s&apos;adaptent à vos
              process
            </p>

            {/* Sous-titre */}
            <p className="text-subdescription">
              Intervention directe dans vos locaux pour un accompagnement
              personnalisé
            </p>

            {/* CTA Principal */}
            <CTAButton />
          </div>

          {/* Colonne de droite - Vidéo Shorts */}
          <div className="space-y-6 flex flex-col items-center">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden w-full max-w-md lg:max-w-lg">
              <div className="aspect-[9/16] flex items-center justify-center relative">
                {!isPlaying ? (
                  // Miniature avec bouton play
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    <Image
                      src={getThumbnail(videoId)}
                      alt="Miniature vidéo"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors">
                        <svg
                          className="w-8 h-8 text-gray-800 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Iframe YouTube Shorts
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&quality=hd1080&vq=hd1080`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            {/* Texte sous la vidéo */}
            <div className="text-center lg:text-left">
              <h4 className="heading-4">Notre approche</h4>
              <p className="text-subdescription text-sm">
                Comment nous accompagnons les entrepreneurs de la construction à
                s&apos;approprier la tech et l&apos;IA grâce à nos solutions
                sur-mesure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
