export const metadata = { title: "Apprendre le SEO" };

const lessons = [
  {
    title: "Choisir ses mots-clés",
    goal: "Viser les requêtes que vos clients tapent vraiment, et que vous pouvez gagner.",
    rules: [
      "Un mot-clé = une intention. « logiciel sur mesure Avignon » (cherche un prestataire) ne se traite pas comme « combien coûte un logiciel sur mesure » (cherche une information).",
      "Une page vise un seul mot-clé principal. Deux pages sur le même mot-clé se concurrencent.",
      "Préférez les requêtes précises et locales : moins de recherches, mais beaucoup moins de concurrence et des visiteurs plus proches de l’achat.",
      "Tapez votre mot-clé dans Google : si la première page est remplie de grands sites nationaux, visez plus précis.",
      "Les « autres questions posées » et les suggestions de Google sont des idées d’articles gratuites.",
    ],
    where: "Champ « Mot-clé principal » de chaque article, puis « Mots-clés suivis » dans la vue d’ensemble.",
  },
  {
    title: "Titres, adresses et meta descriptions",
    goal: "Être compris par Google et donner envie de cliquer.",
    rules: [
      "Titre SEO : 30 à 60 caractères, mot-clé au début, une promesse claire.",
      "Meta description : 120 à 160 caractères. Elle n’améliore pas le classement, mais elle décide du clic.",
      "Adresse : courte, en minuscules, avec le mot-clé, sans date ni mots vides.",
      "Un seul H1 par page (le titre), puis des H2 pour les grandes parties.",
      "Ne changez pas l’adresse d’une page déjà publiée : elle perdrait son classement.",
    ],
    where: "Bloc « Référencement et partage » de l’éditeur, avec l’aperçu Google à droite.",
  },
  {
    title: "Rédiger un contenu qui se positionne",
    goal: "Répondre mieux que les pages déjà classées.",
    rules: [
      "Répondez à la question dès les premières lignes, puis détaillez.",
      "Visez 800 mots et plus pour un sujet de fond, sans remplissage.",
      "Montrez votre expérience : exemples vécus, chiffres réels, captures d’écran. C’est ce que Google valorise le plus.",
      "Des sous-titres formulés comme des questions de clients.",
      "N’écrivez jamais pour répéter un mot-clé : au-delà de 3 % du texte, c’est contre-productif.",
    ],
    where: "Le score SEO de l’éditeur vérifie la longueur, la structure et la fréquence du mot-clé en direct.",
  },
  {
    title: "Images et vitesse",
    goal: "Une page qui s’affiche vite, sur mobile d’abord.",
    rules: [
      "Format WebP, moins de 300 Ko par image.",
      "Un texte alternatif sur chaque image : il décrit l’image, sans liste de mots-clés.",
      "Trois mesures comptent : affichage principal (LCP) sous 2,5 s, stabilité visuelle (CLS) sous 0,1, réactivité (INP) sous 200 ms.",
      "Google classe à partir de la version mobile : testez toujours le mobile.",
    ],
    where: "Page « Médias » pour les images, onglet « Test de vitesse » pour les mesures.",
  },
  {
    title: "SEO local",
    goal: "Apparaître quand on cherche un prestataire près de chez soi.",
    rules: [
      "Créez votre fiche d’établissement Google à Avignon et remplissez-la entièrement.",
      "Demandez un avis Google à chaque client : c’est le premier levier du classement local.",
      "Nom, adresse et téléphone doivent être écrits à l’identique partout (site, fiche Google, annuaires).",
      "Une page par ville visée, avec un contenu réellement propre à la ville.",
      "Plus une ville est loin de votre adresse, plus il est difficile d’y être premier.",
    ],
    where: "« Pages locales » : les 4 blocs uniques de chaque ville.",
  },
  {
    title: "Obtenir des liens",
    goal: "Faire dire à d’autres sites que le vôtre est fiable.",
    rules: [
      "Un lien venant d’un site local ou de votre secteur vaut plus que cent liens d’annuaires génériques.",
      "Pistes concrètes : sites de vos clients, CCI, réseaux d’entrepreneurs, presse locale, partenaires.",
      "N’achetez jamais de liens : Google le sanctionne.",
      "Reliez aussi vos propres pages entre elles : chaque article doit pointer vers un service ou une page locale.",
    ],
    where: "Le score SEO vérifie les liens internes et externes de chaque article.",
  },
  {
    title: "Mesurer et corriger",
    goal: "Décider à partir de chiffres, pas d’impressions.",
    rules: [
      "Regardez vos chiffres une fois par semaine, pas tous les jours : le SEO bouge lentement.",
      "Une page avec beaucoup d’affichages et peu de clics a un titre ou une description à réécrire.",
      "Une page classée entre la 5e et la 15e place est la plus rentable à améliorer.",
      "Comptez 3 à 6 mois avant de juger une page.",
      "Actualisez les articles de plus de 6 mois qui perdent des clics.",
    ],
    where: "Vue d’ensemble du centre SEO : indicateurs, mots-clés suivis et plan d’action.",
  },
];

export default function LessonsPage() {
  return (
    <ol className="flex max-w-4xl flex-col gap-5">
      {lessons.map((l, i) => (
        <li key={l.title} className="panel flex flex-col gap-3">
          <div className="flex items-baseline gap-4">
            <span className="font-arvo text-3xl text-brand-dark">{i + 1}</span>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">{l.title}</h2>
              <p className="text-muted">{l.goal}</p>
            </div>
          </div>
          <ul className="list-disc pl-5">
            {l.rules.map((r) => (
              <li key={r} className="py-0.5">{r}</li>
            ))}
          </ul>
          <p className="rounded-xl bg-ground px-4 py-3 text-sm">
            <strong>Dans le back-office :</strong> {l.where}
          </p>
        </li>
      ))}
    </ol>
  );
}
