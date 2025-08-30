export default function ProjectManagementSection() {
  const projectSteps = [
    {
      step: 1,
      title: "Echange avec la direction",
      icon: "🤝",
    },
    {
      step: 2,
      title:
        "Echange avec les parties prenantes salariés (chef d'équipe, atelier, dessinateur/projeteur, conduc…)",
      icon: "👥",
    },
    {
      step: 3,
      title: "Cahier des charges sommaires",
      icon: "📝",
    },
    {
      step: 4,
      title: "Cahier des charges détaillés",
      icon: "📋",
    },
    {
      step: 5,
      title:
        "On démarre tout petit, 1 fonctionnalités prioritaires en 15 jours. Testée par toutes les parties prenantes",
      icon: "🚀",
    },
    {
      step: 6,
      title:
        "Livraison tous les 15j en moyenne sur une nouvelle fonctionnalité",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Titre et sous-titre */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-arvo text-white mb-6">
            Une approche 100% sur-mesure
          </h2>
          <p className="text-xl md:text-2xl font-inter text-white/90 max-w-4xl mx-auto leading-relaxed">
            Aucune solution proposée sans avoir rencontré vos équipes
            physiquement
          </p>
        </div>

        {/* Timeline des étapes */}
        <div className="space-y-8">
          {projectSteps.map((item, index) => (
            <div key={index} className="relative">
              {/* Ligne de connexion (sauf pour le dernier élément) */}
              {index < projectSteps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-white/20 z-0 hidden md:block"></div>
              )}

              {/* Contenu de l'étape */}
              <div className="flex items-start space-x-6">
                {/* Numéro et icône */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white font-inter font-bold text-lg">
                    {item.step}
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-grow bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-lg md:text-xl font-inter text-white leading-relaxed">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
