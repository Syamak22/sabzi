// Données fixes du site : une seule source pour toutes les pages.
export const site = {
  name: "Sabzi",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sabzi.tech").replace(/\/$/, ""),
  title: "Logiciel sur mesure et site web pour PME",
  description:
    "Sabzi conçoit des logiciels sur mesure, des automatisations et des sites web pour les PME. Première fonctionnalité livrée en 15 jours, à partir de 1 990 €.",
  baseline: "Je construis les outils qui vous manquent, et je les livre par étapes de 15 jours.",
  city: "Avignon",
  email: "pro@syamakazadeh.com",
  phone: "+33 6 75 45 30 07",
  phoneHref: "tel:+33675453007",
  booking: "https://cal.com/syamak-azadeh-s/sabzi-1er-rencontre",
  linkedin: "https://www.linkedin.com/in/syamakazadeh",
  youtube: "https://www.youtube.com/@syamakazadeh",
  videoId: "OvlhsVOPSTM",
  priceFrom: "1 990 €",
} as const;

export const clients = ["FERMOTEC", "BLOOMI", "KONFORM", "LEGALPLACE", "FOUNDERS FUTURE"];

export const keyFigures = [
  { label: "À partir de", value: "1 990 €" },
  { label: "Première livraison", value: "15 jours" },
  { label: "Cadrage", value: "Dans vos locaux" },
  { label: "Livrable", value: "Défini avant de commencer" },
];

export type Service = {
  slug: string;
  label: string;
  hint: string;
  title: string;
  text: string;
  points: string[];
  examples: string[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "logiciel-sur-mesure",
    label: "Logiciel sur mesure",
    hint: "Un outil métier qui suit vos process",
    title: "Un logiciel construit autour de votre façon de travailler",
    text: "Planning, suivi de production, gestion des équipes, stocks, commandes : votre outil reprend vos règles et votre vocabulaire, au lieu de vous imposer les siens.",
    points: [
      "Première fonctionnalité utilisable en 15 jours",
      "Testé et validé par ceux qui s’en servent",
      "Connecté à vos outils existants",
    ],
    examples: ["Application terrain", "Suivi de production", "Gestion des pointages", "Portail client"],
    metaDescription:
      "Logiciel sur mesure pour PME : un outil métier adapté à vos process, livré par étapes de 15 jours. À partir de 1 990 €.",
  },
  {
    slug: "automatisation",
    label: "Automatisation et IA",
    hint: "Les tâches répétitives se font seules",
    title: "Vos tâches répétitives, exécutées sans vous",
    text: "Relances, saisies en double, exports comptables, comptes rendus : je relie vos outils entre eux et j’ajoute de l’IA là où elle fait gagner du temps.",
    points: [
      "Vos outils actuels sont conservés",
      "Chaque automatisation est documentée",
      "Alertes en cas d’anomalie",
    ],
    examples: ["Synchronisation CRM", "Export comptable", "Lecture de documents", "Alertes d’échéances"],
    metaDescription:
      "Automatisation et IA pour PME : vos outils se parlent et les tâches répétitives se font seules. Livraison par étapes de 15 jours.",
  },
  {
    slug: "site-web",
    label: "Site web",
    hint: "Rapide, clair, visible sur Google",
    title: "Un site qui vous amène des clients",
    text: "Un site rapide, pensé pour le référencement, avec un blog que vous alimentez vous-même et un back-office simple pour tout gérer.",
    points: [
      "Référencement intégré dès la conception",
      "Vous publiez sans développeur",
      "Consignes SEO affichées pendant la rédaction",
    ],
    examples: ["Site vitrine", "Blog", "Études de cas", "Prise de rendez-vous"],
    metaDescription:
      "Création de site web pour PME : rapide, visible sur Google, que vous mettez à jour vous-même. À partir de 1 990 €.",
  },
];

export const method = [
  { n: "01", title: "Écoute", text: "Je comprends vos processus et, au besoin, je vous aide à les remettre en perspective." },
  { n: "02", title: "Conseil", text: "Je vous présente ce qu’il est possible de faire : solution existante, sur mesure, ou les deux." },
  { n: "03", title: "Plan d’action", text: "Cahier des charges, planning, investissement et livrables : tout est défini avant de commencer." },
  { n: "04", title: "Exécution", text: "Une à deux fonctionnalités prioritaires en 15 jours, puis une livraison tous les 15 jours en moyenne." },
];

export const testimonials = {
  featured: {
    quote: "Syamak a le sens du détail et développe beaucoup de réflexion pour s’assurer que ce qu’il crée s’adapte au besoin réel.",
    context:
      "Une application métier qui relie HubSpot au personnel terrain : comptes rendus depuis le téléphone, transmis automatiquement aux équipes commerciales.",
    name: "Jerome Manuguerra",
    role: "Dirigeant, FERMOTEC",
  },
  others: [
    { quote: "Un développeur d’une grande qualité, avec une vraie capacité d’adaptation.", name: "Maxence Coulembier", role: "Dirigeant, BLOOMI" },
    { quote: "Syamak est très professionnel et à l’écoute.", name: "Camille Aubery", role: "Directrice investissement, FOUNDERS FUTURE" },
  ],
};

export const CITY_PREFIX = "logiciel-site-web-";
