export default function ProcessSection() {
  const processSteps = [
    {
      number: "01",
      title: "ECOUTE",
      description:
        `Nous comprenons vos processus.
        
        Au besoin nous vous aidons à les remettre en perspective avec une vision nouvelle et objective.`,
      icon: "d",
    },
    {
      number: "02",
      title: "CONSEIL",
      description:
        `Nous vous présentons tout ce qui est possible de faire en matière de technologie et digital.
        
        Solution existante et/ou sur mesure.`,
      icon: "💡",
    },
    {
      number: "03",
      title: "PLANS D'ACTION",
      description:
        `Nous vous proposons un plan concret : 
        cahier des charges, planning, investissement et les différents livrables.`,
      icon: "📋",
    },
    {
      number: "04",
      title: "EXÉCUTION",
      description: "Sabzi exécute le plan d'action",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-arvo text-white mb-6">
            Notre Méthode
          </h2>
        </div>

        {/* Grille des étapes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group ">
              {/* Connecteur entre les étapes (masqué sur mobile) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-white/30 z-0"></div>
              )}

              {/* Card de l'étape */}
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 min-h-[280px] flex flex-col">
                {/* Numéro */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-arvo text-white/60">
                    {step.number}
                  </span>
                  <span className="text-3xl">{step.icon}</span>
                </div>

                {/* Titre */}
                <h3 className="text-xl font-inter font-bold text-white mb-4">
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
      </div>
    </section>
  );
}
