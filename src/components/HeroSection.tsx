export default function HeroSection() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Tag bulle stylé en haut */}
        {/* <div className="mb-12 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
            <p className="text-white text-sm font-inter">
              🔍 Découvrez notre livre blanc : comment réfléchir mes process et
              les automatiser seul
            </p>
          </div>
        </div> */}

        {/* H1 - Arvo Regular */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-arvo font-normal text-white mb-8 leading-relaxed">
          Agence TECH & IA{" "}
          <span className="bg-white text-green-600 px-2 mr-2 py-1 rounded-lg font-bold">
            dédiée
          </span>
          aux entreprises de la construction
        </h1>

        {/* H2 - Arvo Regular */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-arvo font-normal text-white mb-5 leading-relaxed">
          Logiciels spécifiques et automatisations conçus sur mesure
        </h2>

        {/* H3 - Inter */}
        <h3 className="text-xl md:text-2xl font-inter text-white/90 mb-12 font-light">
          {`Ecoute - Conseils - Plan d'action - Exécution`}
        </h3>

        {/* CTA Principal */}
        <div className="flex justify-center">
          <a
            href="https://cal.com/syamak-azadeh-s/audit-offert"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-white text-[#125514] px-8 py-4 rounded-full text-lg font-inter font-semibold hover:bg-gray-100 transition-all duration-400 transform hover:scale-105 shadow-lg group inline-block"
          >
            <span className="relative z-10">Demander mon audit offert</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-400/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </a>
        </div>
      </div>
    </section>
  );
}
