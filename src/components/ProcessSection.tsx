export default function ProcessSection() {
  const processSteps = [
    {
      number: "01",
      title: "ECOUTE",
      description: "On vous pose des questions, vous aide à remettre en perspective vos processus si besoin et vous apporte une vision neuve et objective.",
      icon: "👂"
    },
    {
      number: "02", 
      title: "CONSEIL",
      description: "On vous présente ce qui existe sur le marché ce qui est possible de faire et comment la tech peut vous aider à faire plus d'argent, gagner du temps ou tout simplement stabilisé et faire moins d'effort et profiter de vos enfants",
      icon: "💡"
    },
    {
      number: "03",
      title: "PLANS D'ACTION", 
      description: "On vous propose un plan concret, planning, cahier des charges et les différents livrables avec les résultats attendus",
      icon: "📋"
    },
    {
      number: "04",
      title: "EXÉCUTION",
      description: "Sabzi exécute (en interne avec ses méthodes) pour vous le plan d'action si vous le désirez",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-arvo text-white mb-6">
            Notre Méthode
          </h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
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
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 min-h-[280px] flex flex-col">
                {/* Numéro */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-arvo text-white/60">
                    {step.number}
                  </span>
                  <span className="text-3xl">
                    {step.icon}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="text-xl font-inter font-bold text-white mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 font-inter leading-relaxed text-sm flex-1">
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