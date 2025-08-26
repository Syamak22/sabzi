export default function VideoSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Titre de la section */}
        <h2 className="text-3xl md:text-4xl font-arvo text-white mb-12">
          Découvrez notre approche
        </h2>
        
        {/* Placeholder pour la vidéo */}
        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
          {/* Aspect ratio container pour vidéo 16:9 */}
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center">
              {/* Icône play button */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              {/* Texte explicatif */}
              <h3 className="text-xl md:text-2xl font-inter text-white mb-4">
                Vidéo de présentation
              </h3>
              <p className="text-white/80 font-inter max-w-md mx-auto">
                Découvrez comment nous accompagnons les charpentiers et menuisiers dans leur transformation digitale grâce à nos solutions sur-mesure.
              </p>
            </div>
          </div>
        </div>
        
        {/* Note pour le développeur */}
        <p className="text-white/60 text-sm font-inter mt-6 italic">
          💡 Remplacez ce placeholder par votre vidéo de présentation (YouTube, Vimeo, ou fichier local)
        </p>
      </div>
    </section>
  );
}