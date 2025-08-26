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
                💰 Tarification Transparente
              </div>
            </div>

            {/* Contenu principal */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-arvo text-white leading-relaxed">
                Logiciel à la demande, automatisation et IA
              </h2>
              
              {/* Prix principal */}
              <div className="text-4xl md:text-5xl font-arvo font-bold text-white">
                À partir de <span className="text-white">5000€</span>
              </div>
              
              {/* Détails */}
              <div className="space-y-4 text-lg md:text-xl font-inter text-white/90">
                <p>
                  <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-base">
                    15 jours de développement
                  </span>
                </p>
                <p>Scope défini avant de commencer</p>
                <p className="font-bold text-white">
                  <span className="bg-white/20 px-4 py-2 rounded-lg">
                    Prix fixe
                  </span>
                </p>
              </div>
              
              {/* CTA */}
              <div className="pt-6">
                <button className="relative overflow-hidden bg-white text-[#125514] px-8 py-4 rounded-full text-lg font-inter font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg group">
                  <span className="relative z-10">Demander un devis gratuit</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-400/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Informations complémentaires */}
        <div className="mt-12 text-center">
          <p className="text-white/70 font-inter text-sm max-w-2xl mx-auto leading-relaxed">
            ✨ Chaque projet est unique. Ce tarif correspond à notre offre de base. 
            Nous vous proposons toujours un audit gratuit pour évaluer précisément vos besoins.
          </p>
        </div>
      </div>
    </section>
  );
}