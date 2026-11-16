# Sabzi — site web

Site de Sabzi : logiciels sur mesure, automatisation et sites web pour PME. Basé à Avignon. Langue : français.

## Pile technique

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4
- PostgreSQL avec Drizzle ORM (`postgres` comme pilote)
- Contenu rédigé en Markdown, rendu avec `marked`
- Déploiement prévu : Railway (puis VPS)

## Commandes

```bash
npm run dev          # serveur de développement
npm run build        # compilation de production
npm run lint         # ESLint
npm run db:generate  # génère une migration après modification de src/db/schema.ts
npm run db:migrate   # applique les migrations
npm run db:seed      # insère les données de départ (relançable)
```

Variables d'environnement : voir `.env.example`.

## Structure

```
src/
├── app/
│   ├── page.tsx                 # accueil
│   ├── [slug]/page.tsx          # pages de service ET pages locales (préfixe logiciel-site-web-)
│   ├── blog/                    # liste et article
│   ├── zones-intervention/      # liste des villes
│   ├── contact/                 # formulaire (server action -> table contacts)
│   ├── sitemap.ts, robots.ts    # générés automatiquement
│   └── globals.css              # charte (tokens @theme) et styles du Markdown
├── components/                  # Header, Footer, Hero, Sections, ServiceTabs, VideoLite, JsonLd
├── db/                          # schema.ts, index.ts (getDb), seed.ts
└── lib/                         # site.ts (textes et constantes), queries.ts, markdown.ts, villes.ts
drizzle/                         # migrations SQL
```

## Règles du projet

- **Charte** : orange `#f26335` (fonds et gros éléments), `#b8401c` pour le petit texte coloré (contraste), noir `#0e0801`, fond `#fbf8f5`. Titres en Arvo Regular, texte en Inter. Les boutons orange ont un texte noir.
- **Textes fixes** : tout est dans `src/lib/site.ts`. Ne pas dupliquer de texte dans les pages.
- **Pages locales** : un seul modèle dans `src/app/[slug]/page.tsx`. Les blocs communs insèrent le nom de la ville ; les blocs uniques viennent de la table `cities`. Une ville n'est visible que si `status = 'published'`.
- **Aucun contenu inventé** : pas de faux avis, de fausses réalisations ni de chiffres non vérifiés.
- **Base absente** : `src/lib/queries.ts` renvoie des listes vides si la base est injoignable ; le site doit toujours compiler et s'afficher.
- **SEO** : chaque page définit `title`, `description` et `alternates.canonical`. Les brouillons sont en `noindex` et absents du sitemap.
- **Branches** : `main` est le site en production. Le travail de refonte se fait sur `refonte`.

## Reste à faire

- Back-office (`/admin`) : connexion, éditeur d'articles avec analyse SEO, pages locales, réalisations, contacts (CRM), médias
- Centre SEO : Search Console, PageSpeed Insights, suivi de positions
- E-mails via Brevo, mentions légales, page réalisation détaillée
