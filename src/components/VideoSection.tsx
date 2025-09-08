"use client";
import { useState } from "react";
import Image from "next/image";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "M53hAzK9sbM";

  const getThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Titre de la section */}
        <h2 className="text-3xl md:text-4xl font-arvo text-white mb-8">
          Découvrez notre approche
        </h2>
        <h3 className="text-white/80 font-inter whitespace-normal mx-auto mb-12 text-xl">
          {`Comment nous accompagnons les entrepreneurs de la construction à s'approprier la tech et l'IA grâce à nos solutions sur-mesure`}
        </h3>

        {/* Container vidéo */}
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
                {/* Texte par-dessus la miniature */}
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
      </div>
    </section>
  );
}
