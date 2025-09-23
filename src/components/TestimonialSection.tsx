"use client"

import { useState } from "react";
import CTAButton from "./CTAButton";

export default function TestimonialSection() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  const testimonials = [
    {
      name: "Jerome Manuguerra",
      company: "Dirigeant - FERMOTEC",
      text: `J’ai fait appel à Syamak pour développer une application métier pour mon entreprise, afin de relier mon outil commercial HubSpot à mon personnel terrain. Cette application permet à mes équipes sur le terrain de retrouver les projets, réaliser leurs comptes rendus directement depuis leur téléphone, et transmettre automatiquement les informations aux équipes commerciales sur HubSpot, dans le bon projet et la bonne fiche client.
Syamak a le sens du détail et développe beaucoup de réflexion pour s’assurer que ce qu’il crée s’adapte au besoin réel. 
Je recommande 👍`,
      rating: 5,
    },
    {
      name: "Maxence Coulembier",
      company: "Dirigeant - BLOOMI",
      text: `Syamak est un développeur d’une grande qualité, avec un talent incommensurable et une vraie capacité d’adaptation. À plusieurs reprises, il nous a épaulés dans la conception de BLOOMI, intervenant toujours avec justesse et efficacité lorsque le besoin s’en faisait sentir.

Sa rigueur, sa vision structurée et son professionnalisme ont été des atouts clés dans le développement de notre projet. Il ne se contente pas de livrer du code : il réfléchit, challenge, propose des solutions pertinentes et améliore véritablement la dynamique globale d’un produit.

Travailler avec lui, c’est bénéficier d’un partenaire fiable, engagé, et tourné vers l’excellence. Je recommande vivement Syamak à toute personne ou équipe souhaitant faire évoluer son projet avec sérieux, ambition et innovation.`,
      rating: 5,
    },
    {
      name: "Camille Aubery",
      company: "Directrice investissement - FOUNDERS FUTUR",
      text: `Syamak est très professionnel et à l'écoute. 
Il m'a tout de suite orienté vers une solution gratuite et efficace pour mon besoin et essaye de trouver les meilleures solutions (prix/efficacité) pour ses clients! 
Je recommande sincèrement ses services.`,
      rating: 5,
    },
    {
      name: "Cyril Lecat",
      company: "Dirigeant - KONFORM",
      text: `J'ai la chance de collaborer avec Syamak au sein de KONFORM®, un associé à la soif d'apprendre inépuisable. Vraiment ;)

Chaque nouveau sujet auquel il s'intéresse devient une passion, et il pousse toujours plus loin ses connaissances. Ce que j'admire chez lui, c'est sa capacité à assimiler rapidement et à délivrer des résultats concrets avec une belle efficacité.

Je souhaite à tout le monde d'avoir "un Syamak" pour entreprendre à ses côtés. 
C'est une vraie force pour tout projet !`,
      rating: 5,
    },
    {
      name: "Benoit Lecureur",
      company: "Chargé produit - LEGALPLACE",
      text: `Je recommande Syamak sans hésitation, très bonne maîtrise et technique de Bubble, passionné par le Produit, SaaS. Vous pouvez lui faire confiance pour vos projets de développement web / SaaS, il saura toujours relever les défis qui se présentent à lui et peu importe leur difficulté, il ira chercher les solutions les plus adaptées.`,
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="heading-2">
            Ils nous font confiance
          </h2>
          <p className="text-description max-w-2xl mx-auto">
            Découvrez comment nos clients ont
            transformé leur activité avec notre collaboration.
          </p>
        </div>

        {/* Témoignage principal en tête de gondole */}
        <div className="mb-16">
          <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            {/* Étoiles */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[0].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Témoignage principal */}
            <blockquote className="text-white/90 font-inter text-lg md:text-xl leading-relaxed text-center mb-8 italic">
              "{testimonials[0].text}"
            </blockquote>

            {/* Nom et entreprise */}
            <div className="text-center">
              <p className="text-white font-bold text-lg">
                {testimonials[0].name}
              </p>
              <p className="text-white/70 text-base">{testimonials[0].company}</p>
            </div>
          </div>
        </div>

        {/* Autres témoignages en grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(1).map((testimonial, index) => {
            const isExpanded = expandedCards.includes(index);
            const isLongText = testimonial.text.length > 150;
            
            return (
              <div
                key={index + 1}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all flex flex-col"
                style={{ minHeight: isExpanded ? 'auto' : '0px' }}
              >
                {/* Étoiles */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Témoignage */}
                <div className="flex-1 mb-4">
                  <p className="text-white/90 font-inter text-sm leading-relaxed">
                    &quot;{isExpanded || !isLongText 
                      ? testimonial.text 
                      : `${testimonial.text.substring(0, 150)}...`}&quot;
                  </p>
                  
                  {/* Bouton Voir plus / Voir moins */}
                  {isLongText && (
                    <button
                      onClick={() => toggleCard(index)}
                      className="mt-3 text-white/70 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      {isExpanded ? 'Voir moins' : 'Voir plus'}
                    </button>
                  )}
                </div>

                {/* Nom et entreprise */}
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <p className="text-white font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-white/70 text-xs">{testimonial.company}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Principal */}
        <div className="mt-16 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
