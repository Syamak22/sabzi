"use client";

import { useState } from "react";

// La vidéo YouTube n'est chargée qu'au clic : la page reste rapide (bon pour le SEO).
export default function VideoLite({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[290px] overflow-hidden rounded-3xl bg-peach-strong shadow-[0_20px_50px_rgba(242,99,53,0.18)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Lire la vidéo : ${title}`}
          className="group absolute inset-0 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            loading="eager"
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-brand transition group-hover:scale-105">
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="#0e0801">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
