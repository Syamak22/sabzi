"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ExpectedResults() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleOpenCard = (index: number) => {
    setOpenCard(index);
    // Bloque le scroll de la page
    document.body.style.overflow = "hidden";
  };

  const handleCloseCard = () => {
    setOpenCard(null);
    // Remet le scroll de la page
    document.body.style.overflow = "unset";
  };

  // Nettoie l'overflow lors du démontage du composant
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const results = [
    {
      icon: "/production.png",
      icons: ["/production.png"], // Peut contenir plusieurs images
      title: "Production",
      shortDescription:
        "Optimisation des processus de production et amélioration de l'efficacité opérationnelle",
      fullDescription: `Notre approche de production se concentre sur l'optimisation complète de vos processus métiers.

        Nous automatisons les tâches répétitives, connectons vos outils et centralisons vos données.
        
        Tableaux de bord intelligents et flux de travail simplifié, nous faisons parler vos données pour améliorer la prise de décision, gagner du temps et renforcer la productivité`,
      example: `Exemple : Connexion entre votre outils de devis/facture à votre logiciel sur-mesure de gestion de projet. Vous voyez vos chantier, les infos importantes comme les parties prenantes, les reponsables et les documents associés. 
      Chaque conduc ou chef de chantier peut consulter et saisir de la donnée sur sa tablette ou téléphone.`,
    },
    {
      icon: "/rh.png",
      icons: ["/rh.png", "/personnel.png"], // Exemple avec 2 images
      title: "Ressources Humaines",
      shortDescription:
        "Gestion simplifiée des équipes, salariés, pointages et automatisation des tâches administratives",
      fullDescription: `La digitalisation de vos ressources humaines transforme radicalement la gestion de vos équipes. 

        Nos solutions couvrent la planification intelligente des équipes, le suivi détaillé des compétences, la gestion automatisée des congés et la formation du personnel.

        Nous créons des portails RH intuitifs qui permettent à vos employés de gérer leurs demandes de manière autonome, tout en offrant aux managers des outils de pilotage avancés pour optimiser l'allocation des ressources.`,
      example:
        "Exemple : Application mobile de pointage avec géolocalisation, validation par le conduc et export comptable CSV en 1 clique",
    },
    {
      icon: "/communication.png",
      icons: ["/communication.png"],
      title: "Communication",
      shortDescription:
        "Amélioration de la communication interne avec vos collaborateurs et externe avec vos clients",
      fullDescription: `Une communication fluide est essentielle au succès de votre entreprise. 
        
        Nous mettons en place des systèmes de communication intégrés qui connectent tous vos collaborateurs, clients et partenaires.
        
        Ces solutions incluent des plateformes de messagerie unifiées, des systèmes de notifications automatiques intelligentes, et des outils de suivi des interactions client.
        L'objectif est de créer un écosystème communicationnel qui améliore la réactivité, réduit les malentendus et renforce les relations avec vos parties prenantes.`,
      example:
        "Exemple : Portail client avec suivi temps réel des travaux, photos d'avancement et messagerie directe avec l'équipe terrain.",
    },
    {
      icon: "/atelier.png",
      icons: ["/atelier.png", "/atelier2.png"], // Exemple avec 2 images
      title: "Atelier, commandes, stocks",
      shortDescription:
        "Centralisation et automatisation de la gestion de votre atelier, des commandes et du stocks en temps réel",
      fullDescription: `Gestion centralisée de votre atelier, optimisation des commandes et suivi intelligent des stocks.
        
        Nous digitalisons la gestion de vos matériaux, automatisons les commandes fournisseurs et optimisons votre organisation d'atelier.
        
        Réduction des ruptures de stock, amélioration de la traçabilité et optimisation des coûts d'approvisionnement.`,
      example:
        "Exemple : Système de scan pour traçabilité des matériaux avec commande automatique quand le niveau du stock atteint un seuil critique.",
    },
    {
      icon: "/production.png",
      icons: ["/production.png"],
      title: "Sécurité, conformité, véhicules",
      shortDescription:
        "Gestion des obligations sociales et légales de votre entreprise",
      fullDescription: `La conformité réglementaire n'a jamais été aussi complexe. 
        
        Notre solution de gestion sociale et légale vous accompagne dans le respect de toutes vos obligations.
        
        Nous automatisons le suivi réglementaire, générons automatiquement les documents obligatoires, et vous alertons sur les échéances importantes. Pour les véhicules le suivi des controles techniques, révisions et gestion des amendes.
        
        Cette approche préventive vous protège des risques de non-conformité, optimise vos relations avec les organismes de contrôle et vous fait gagner un temps considérable dans la gestion administrative de votre entreprise.`,
      example:
        "Exemple : Application de contrôle sécurité chantier avec photos géolocalisées et génération automatique des rapports de conformité.",
    },
    {
      icon: "/production.png",
      icons: ["/production.png"],
      title: "Formation et connaissance tech",
      shortDescription:
        "Vous faire monter vous, et vos collaborateurs en compétences",
      fullDescription: `De nos jours, la technologie est un outil stratégique qui redéfinit votre entreprise.
        
        Nous vous accompagnons dans la dématérialisation complète de vos processus, la migration vers le cloud computing, et la modernisation de tous vos outils de travail tout en vous formant est expliquant les tenants et aboutissants.
        
        Notre monde est en constante évolution et nous proposons des ateliers de travail pour discuter sur les enjeux technologiques, sociaux et économique.`,
      example:
        "Exemple : Quelle est la différence entre avoir votre porpre serveur en interne et/ou tout mettre sur un serveur cloud. Comprendre les outils et logiciels disponibles en ligne associés à votre expertise. Comment gérer vos mot de passe, et utiliser un gestionnaire de mot de passe. Sensibiliser vos équipes à l'IA et savoir distinguer une fake news.",
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(75, 85, 99, 0.8) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 10px;
          border: 2px solid transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 1);
        }
      `}</style>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Titre de la section */}
          <div className="text-center mb-16">
            <h2 className="heading-2">
              Découvrez les résultats concrets que notre partenariat apporte à
              votre entreprise
            </h2>
          </div>

          {/* Grille des résultats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <div key={index} className="relative group">
                {/* Card du résultat */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 h-[380px] flex flex-col items-center text-center">
                  {/* Icône SVG */}
                  <div className="mb-4 flex-shrink-0 h-32 flex items-center justify-center">
                    <Image
                      src={result.icon}
                      alt={result.title}
                      width={200}
                      height={200}
                      className="max-h-32 w-auto object-contain rounded-xl"
                    />
                  </div>

                  {/* Titre */}
                  <h3 className="heading-3">
                    {result.title}
                  </h3>

                  {/* Description courte */}
                  <p className="text-white/90 font-inter leading-relaxed text-xs md:text-sm flex-1 line-clamp-3 mb-4">
                    {result.shortDescription}
                  </p>

                  {/* Bouton Agrandir */}
                  <button
                    onClick={() => handleOpenCard(index)}
                    className="mt-auto inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 3H21V9M14 10L20.2 3.8M9 21H3V15M10 14L3.8 20.2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Agrandir le détail
                  </button>
                </div>

                {/* Modal/Overlay au clic */}
                {openCard === index && (
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-500 ease-in-out overflow-y-auto"
                    style={{
                      animation: "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      touchAction: "none",
                    }}
                    onClick={handleCloseCard}
                  >
                    <div
                      className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-4 md:p-8 lg:p-16 max-w-6xl w-full mx-auto my-8 transform scale-100 transition-all duration-500 ease-out shadow-2xl relative max-h-[90vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                      style={{
                        animation:
                          "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Bouton Fermer */}
                      <button
                        onClick={handleCloseCard}
                        className="absolute top-2 right-2 md:top-6 md:right-6 inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg text-white text-xs md:text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="md:w-4 md:h-4"
                        >
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="hidden md:inline">Fermer</span>
                      </button>

                      <div className="flex flex-col items-center text-center">
                        {/* Titre */}
                        <h3 className="heading-1 text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 mt-8 md:mt-0">
                          {result.title}
                        </h3>

                        {/* Description complète au-dessus du SVG */}
                        <p className="text-white/90 font-inter leading-relaxed text-sm md:text-lg lg:text-xl w-full md:max-w-4xl break-words hyphens-auto mb-6 whitespace-pre-line text-justify">
                          {result.fullDescription}
                        </p>

                        {/* Exemple concret en italique */}
                        <p className="text-white/80 font-inter leading-relaxed text-sm md:text-base lg:text-lg w-full md:max-w-4xl break-words hyphens-auto mb-10 italic text-justify">
                          {result.example}
                        </p>

                        {/* Images agrandies */}
                        <div className="mb-6">
                          {result.icons && result.icons.length > 1 ? (
                            // Affichage en grille pour plusieurs images
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                              {result.icons.map((iconSrc, iconIndex) => (
                                <div key={iconIndex} className="w-full">
                                  <Image
                                    src={iconSrc}
                                    alt={`${result.title} ${iconIndex + 1}`}
                                    width={600}
                                    height={600}
                                    className="w-full object-contain transition-transform duration-500 ease-out rounded-2xl"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Affichage unique pour une seule image
                            <Image
                              src={result.icons?.[0] || result.icon}
                              alt={result.title}
                              width={900}
                              height={900}
                              className="mx-auto object-contain transition-transform duration-500 ease-out rounded-2xl"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
