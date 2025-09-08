import CTAButton from "./CTAButton";

export default function HeroSection() {
  return (
    <section className="py-15 px-6 text-center sm:py-30">
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-arvo font-normal text-white mb-8 leading-extratight">
          <span className="px-2 mr-2 py-1 rounded-lg font-bold italic">
            Agence Tech & IA
          </span>
          dédiée aux entreprises de la construction
        </h1>

        {/* H2 - Arvo Regular */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-arvo font-normal text-white mb-12 leading-relaxed">
          Logiciels spécifiques et automatisations conçus sur mesure
        </h2>

        {/* CTA Principal */}
        <CTAButton />
      </div>
    </section>
  );
}
