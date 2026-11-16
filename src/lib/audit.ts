// Audit du contenu du site : sert au tableau de bord et au plan d'action du centre SEO.
import { analyzeSeo, type SeoReport } from "./seo";
import { site } from "./site";
import { countWords } from "./slug";
import type { City, Post } from "@/db/schema";

export const siteHost = site.url.replace(/^https?:\/\//, "");

export function postReport(p: Post): SeoReport {
  return analyzeSeo({ ...p, siteHost });
}

// Les 4 blocs uniques d'une page locale.
export function cityBlocks(c: City) {
  const blocks = [
    { label: "Contexte local", done: countWords(c.contextMd) >= 80 },
    { label: "Communes voisines", done: c.nearbyMd.trim() !== "" },
    { label: "Cas d’usage", done: c.useCaseTitle.trim() !== "" && countWords(c.useCaseMd) >= 40 },
    { label: "Question propre à la ville", done: c.faqQuestion.trim() !== "" && c.faqAnswer.trim() !== "" },
  ];
  const uniqueWords = countWords([c.contextMd, c.nearbyMd, c.useCaseTitle, c.useCaseMd, c.faqQuestion, c.faqAnswer].join(" "));
  return { blocks, filled: blocks.filter((b) => b.done).length, uniqueWords };
}

export type Action = { priority: 1 | 2 | 3; title: string; why: string; href: string };

export function actionPlan(posts: Post[], cities: City[], trackedKeywords: number): Action[] {
  const actions: Action[] = [];
  const published = posts.filter((p) => p.status === "published");
  const sixMonthsAgo = Date.now() - 183 * 86400000;

  for (const c of cities) {
    const { filled } = cityBlocks(c);
    if (c.status !== "published")
      actions.push({
        priority: filled === 4 ? 1 : 2,
        title: filled === 4 ? `Publier la page ${c.name}` : `Rédiger la page ${c.name} (${filled} bloc(s) sur 4)`,
        why: "Une page locale ne peut se positionner que si elle est publiée avec un contenu propre à la ville.",
        href: `/admin/villes/${c.id}`,
      });
  }
  if (published.length === 0)
    actions.push({ priority: 1, title: "Publier un premier article", why: "Sans article, le blog n’apporte aucun trafic et la section blog de l’accueil reste masquée.", href: "/admin/articles/nouveau" });
  for (const p of posts) {
    const r = postReport(p);
    const fails = r.checks.filter((c) => c.status === "fail");
    if (p.status === "published" && fails.length)
      actions.push({ priority: 1, title: `Corriger « ${p.title} »`, why: fails.map((f) => f.label.toLowerCase()).join(", ") + ".", href: `/admin/articles/${p.id}` });
    else if (p.status === "published" && r.score < 80)
      actions.push({ priority: 2, title: `Améliorer « ${p.title} » (${r.score} / 100)`, why: "Le score est sous 80 : traitez les points signalés dans l’éditeur.", href: `/admin/articles/${p.id}` });
    if (p.status === "published" && p.updatedAt.getTime() < sixMonthsAgo)
      actions.push({ priority: 3, title: `Actualiser « ${p.title} »`, why: "Non modifié depuis plus de 6 mois : Google favorise les contenus tenus à jour.", href: `/admin/articles/${p.id}` });
    if (p.status === "draft" && r.score >= 80)
      actions.push({ priority: 2, title: `Publier « ${p.title} »`, why: "Ce brouillon a un bon score et n’est pas encore en ligne.", href: `/admin/articles/${p.id}` });
  }
  if (trackedKeywords === 0)
    actions.push({ priority: 2, title: "Ajouter vos mots-clés à suivre", why: "Sans mot-clé suivi, impossible de mesurer votre progression sur Google.", href: "/admin/seo" });
  return actions.sort((a, b) => a.priority - b.priority);
}
