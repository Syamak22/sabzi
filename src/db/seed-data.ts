// Données de départ. Relançable sans risque : rien n'est écrasé.
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { categories, cities, projects } from "./schema";

export async function seed(db: PostgresJsDatabase<typeof schema>) {
  await db
    .insert(categories)
    .values([
      { name: "Logiciel sur mesure", slug: "logiciel-sur-mesure" },
      { name: "Automatisation", slug: "automatisation" },
      { name: "Site web", slug: "site-web" },
      { name: "Études de cas", slug: "etudes-de-cas" },
    ])
    .onConflictDoNothing();

  // Les blocs uniques restent vides : une ville n'est publiée qu'une fois rédigée.
  await db
    .insert(cities)
    .values([
      { name: "Avignon", slug: "avignon", department: "Vaucluse", position: 1 },
      { name: "Nîmes", slug: "nimes", department: "Gard", position: 2 },
      { name: "Aix-en-Provence", slug: "aix-en-provence", department: "Bouches-du-Rhône", position: 3 },
      { name: "Montpellier", slug: "montpellier", department: "Hérault", position: 4 },
    ])
    .onConflictDoNothing();

  await db
    .insert(projects)
    .values([
      {
        title: "Une application terrain reliée à HubSpot",
        slug: "fermotec-application-terrain-hubspot",
        clientName: "FERMOTEC",
        serviceType: "Application métier",
        summary:
          "Les équipes retrouvent leurs projets et rédigent leurs comptes rendus depuis le téléphone. Tout arrive dans la bonne fiche client.",
        status: "published",
        position: 1,
      },
    ])
    .onConflictDoNothing();
}
