export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Pierre Dubois",
      company: "Charpenterie Dubois",
      text: "Sabzi a transformé notre façon de travailler. Le logiciel de gestion des projets nous fait gagner 3h par jour et nos clients sont ravis du suivi en temps réel.",
      rating: 5,
    },
    {
      name: "Marie Lefèvre",
      company: "Menuiserie Artisanale ML",
      text: "L'automatisation des devis nous a permis de traiter 2x plus de demandes. Le ROI était visible dès le premier mois. Une équipe à l'écoute et très réactive.",
      rating: 5,
    },
    {
      name: "Jean-Claude Martin",
      company: "Construction Martin & Fils",
      text: "L'IA pour l'optimisation des matériaux nous a fait économiser 15% sur nos achats. Un outil précieux pour rester compétitif sur le marché.",
      rating: 5,
    },
    {
      name: "Sophie Moreau",
      company: "Atelier Bois Moreau",
      text: "Le suivi automatisé des commandes nous a fait gagner en efficacité. Nos clients apprécient la transparence et nous avons réduit les erreurs de 80%.",
      rating: 5,
    },
    {
      name: "Thomas Bernard",
      company: "Charpente & Co",
      text: "Grâce à l'IA de Sabzi, nous optimisons nos découpes et réduisons le gaspillage. C'est un game-changer pour notre rentabilité.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-arvo text-white mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-white/80 font-inter text-lg max-w-2xl mx-auto">
            Découvrez comment nos clients du secteur de la construction ont
            transformé leur activité avec nos solutions sur-mesure.
          </p>
        </div>

        {/* Carrousel de témoignages */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            {/* Première série de témoignages */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-80 ml-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                {/* Étoiles */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Témoignage */}
                <blockquote className="text-white font-inter mb-6 text-base leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-white/20 pt-6">
                  <div className="font-arvo text-white text-lg font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-white/70 font-inter">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}

            {/* Deuxième série de témoignages (pour boucle infinie) */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-80 ml-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                {/* Étoiles */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Témoignage */}
                <blockquote className="text-white font-inter mb-6 text-base leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-white/20 pt-6">
                  <div className="font-arvo text-white text-lg font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-white/70 font-inter">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center mt-16">
          <button className="bg-white text-[#125514] px-8 py-4 rounded-full font-inter font-semibold hover:bg-white/90 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Demander une démo gratuite
          </button>
        </div>
      </div>
    </section>
  );
}
