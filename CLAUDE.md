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
│   ├── (site)/                  # site public (Header + Footer)
│   │   ├── page.tsx             # accueil
│   │   ├── [slug]/page.tsx      # pages de service ET pages locales (préfixe logiciel-site-web-)
│   │   ├── blog/, contact/, zones-intervention/, mentions-legales/
│   ├── admin/
│   │   ├── (auth)/connexion/    # page de connexion
│   │   ├── (panel)/             # back-office protégé : articles, villes, realisations, contacts, medias, seo
│   │   └── actions.ts           # toutes les actions serveur du back-office
│   ├── media/[name]/route.ts    # sert les images envoyées
│   ├── sitemap.ts, robots.ts    # générés automatiquement
│   └── globals.css              # charte (tokens @theme), styles Markdown, classes du back-office
├── components/                  # site public ; components/admin/ pour le back-office
├── db/                          # schema.ts, index.ts (getDb), seed-data.ts, seed.ts
├── instrumentation.ts           # au démarrage : migrations, données de départ, premier administrateur
└── lib/                         # site.ts, queries.ts, seo.ts, audit.ts, auth.ts, gsc.ts, pagespeed.ts, brevo.ts…
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

- **Back-office** : chaque page de `admin/(panel)` et chaque action de `admin/actions.ts` commence par `requireAdmin()`. Après une écriture, appeler `refreshPublic()` pour rafraîchir les pages publiques.
- **Client et serveur** : ne pas exporter de constante depuis un fichier `"use client"` pour l'utiliser côté serveur (voir `lib/stages.ts`).
- **Formulaires** : utiliser `ActionForm` ou `submitWithoutReset` pour que la saisie ne soit pas vidée en cas d'erreur.
- **Analyse SEO** : `lib/seo.ts` est une fonction pure, partagée entre l'éditeur (en direct) et l'audit serveur (`lib/audit.ts`).

## Reste à faire

- Rédiger les 4 pages locales et les premiers articles
- Compléter `legal` dans `src/lib/site.ts` (SIRET, statut, adresse, hébergeur)
- Connecter Google Search Console, Brevo et un volume pour `MEDIA_DIR` (voir `.env.example`)
- Suivi de positions par ville (DataForSEO), page de détail d'une réalisation
