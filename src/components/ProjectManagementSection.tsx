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
          <h2 className="heading-2">
            100% sur-mesure, 100% disponible, 100% à votre écoute
          </h2>
          <p className="text-description max-w-4xl mx-auto">
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
                <div className="absolute left-4 md:left-6 top-12 md:top-16 w-0.5 h-12 md:h-16 bg-white/20 z-0 hidden sm:block"></div>
              )}

              {/* Contenu de l'étape */}
              <div className="flex items-start space-x-4 md:space-x-6">
                {/* Numéro */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white font-inter font-bold text-sm md:text-lg">
                    {item.step}
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-grow bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
                    <span className="text-lg md:text-2xl mx-auto md:mx-0">{item.icon}</span>
                    <h3 className="heading-4 text-sm md:text-base lg:text-lg">
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
