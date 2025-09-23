import CTAButton from "./CTAButton";

export default function PricingSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Encadré de tarification mis en avant */}
        <div className="relative">
          {/* Effet de glow autour de l'encadré */}
          <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-2xl blur-sm"></div>

          {/* Encadré principal */}
          <div className="relative bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 md:p-12 text-center">
            {/* Badge en haut */}
            <div className="mb-6 flex justify-center">
              <div className="bg-white text-[#125514] px-4 py-2 rounded-full text-sm font-inter font-semibold">
                💰 Tarification transparente
              </div>
            </div>

            {/* Contenu principal */}
            <div className="space-y-10">
              <h2 className="heading-2">
                Logiciels, automatisation et IA sur mesures
              </h2>

              {/* Prix principal */}
              <div className="text-4xl md:text-5xl font-arvo font-bold text-white">
                À partir de <span className="text-white">5500€</span>
              </div>

              {/* Détails */}
              <div className="space-y-4 text-description">
                <p>
                  <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-base">
                    15 jours de développement min
                  </span>
                </p>
                <p>Livrable défini avant de commencer</p>
                <p className="font-bold text-white"></p>
              </div>
              {/* CTA Principal */}

              <CTAButton />
            </div>
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="mt-12 text-center">
          <p className="text-white/70 font-inter text-sm max-w-2xl mx-auto leading-relaxed">
            ✨ Chaque projet est unique. Ce tarif correspond à notre offre de
            base. Nous réalisons toujours une réunion physique pour cadrer votre
            projet.
          </p>
        </div>
      </div>
    </section>
  );
}
