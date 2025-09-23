"use client";

import Image from "next/image";

export default function ProcessSection() {
  const processSteps = [
    {
      number: "01",
      title: "ECOUTE",
      description: `Nous comprenons vos processus.
        
        Au besoin nous vous aidons à les remettre en perspective avec une vision nouvelle et objective.`,
      icon: "/meeting.svg",
      videoUrl: "https://www.youtube.com", // Remplacez par l'URL de votre vidéo
    },
    {
      number: "02",
      title: "CONSEIL",
      description: `Nous vous présentons tout ce qui est possible de faire en matière de technologie et digital.
        
        Solution existante et/ou sur mesure.`,
      icon: "/advice.svg",
      videoUrl: "#", // Remplacez par l'URL de votre vidéo
    },
    {
      number: "03",
      title: "PLANS D'ACTION",
      description: `Nous vous proposons un plan concret : 
        cahier des charges, planning, investissement et les différents livrables.`,
      icon: "/plans.svg",
      videoUrl: "#", // Remplacez par l'URL de votre vidéo
    },
    {
      number: "04",
      title: "EXÉCUTION",
      description: "Sabzi exécute le plan d'action",
      icon: "/execution.svg",
      videoUrl: "#", // Remplacez par l'URL de votre vidéo
    },
  ];

  const handleVideoClick = (videoUrl: string) => {
    // Ouvre la vidéo dans un nouvel onglet
    window.open(videoUrl, "_blank");
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="heading-2">
            Notre Méthode
          </h2>
        </div>

        {/* Grille des étapes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connecteur entre les étapes (masqué sur mobile) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-white/30 z-0"></div>
              )}

              {/* Card de l'étape */}
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 min-h-[320px] flex flex-col">
                {/* Numéro */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-arvo text-white/60">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={40}
                      height={40}
                      className="max-w-full max-h-full object-contain"
                      style={{
                        filter: 'brightness(0) invert(1)',
                      }}
                    />
                  </div>
                </div>

                {/* Titre */}
                <h3 className="heading-3 mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 font-inter leading-relaxed text-sm flex-1 whitespace-pre-line">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton vidéo centralisé pour toute la méthode */}
        <div className="text-center mt-16">
          <button
            onClick={() => handleVideoClick("https://cal.com/syamak-azadeh-s/sabzi-1er-rencontre")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
            Voir un exemple
          </button>
        </div>
      </div>
    </section>
  );
}
