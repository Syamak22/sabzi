"use client";
import { useState } from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "M53hAzK9sbM";

  const getThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <section className="py-15 px-6 sm:py-30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne de gauche - Contenu Hero */}
          <div className="text-center lg:text-left">
            {/* H1 - Arvo Regular */}
            <h1 className="text-4xl md:text-6xl lg:text-5xl xl:text-6xl font-arvo font-normal text-white mb-8 leading-extratight">
              <span className="px-2 mr-2 py-1 rounded-lg font-bold italic">
                Agence Tech & IA
              </span>
              dédiée aux entreprises de la construction
            </h1>

            {/* H2 - Arvo Regular */}
            <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-arvo font-normal text-white mb-8 leading-relaxed">
              Logiciels spécifiques et automatisations conçus sur mesure
            </h2>

            {/* H3 - inter */}
            <h3 className="text-l md:text-xl lg:text-lg xl:text-xl font-arvo font-light text-white mb-8 leading-relaxed">
              Votre unique allié et partenaire tech
            </h3>

            {/* CTA Principal */}
            <CTAButton />
          </div>

          {/* Colonne de droite - Vidéo */}
          <div className="space-y-6">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
              <div className="aspect-video flex items-center justify-center relative">
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
                  // Iframe YouTube
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
            
            {/* Texte sous la vidéo */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl md:text-2xl font-arvo text-white mb-3">
                Découvrez notre approche
              </h4>
              <p className="text-white/80 font-inter text-sm md:text-base leading-relaxed">
                Comment nous accompagnons les entrepreneurs de la construction à s&apos;approprier la tech et l&apos;IA grâce à nos solutions sur-mesure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
