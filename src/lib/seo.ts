// Analyse SEO d'un contenu. Fonction pure : utilisée en direct dans l'éditeur et côté serveur pour l'audit.
import { countWords, slugify } from "./slug";

export type SeoStatus = "ok" | "warn" | "fail";
export type SeoCheck = { id: string; group: string; label: string; status: SeoStatus; message: string; weight: number };
export type SeoReport = { score: number; wordCount: number; checks: SeoCheck[] };
export type SeoInput = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  excerpt: string;
  contentMd: string;
  coverImageUrl: string;
  coverImageAlt: string;
  siteHost?: string;
};

const norm = (t: string) => slugify(t).replace(/-/g, " ");
const has = (haystack: string, kw: string) => kw.trim() !== "" && norm(haystack).includes(norm(kw));

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]+/g, " ");
}

export function analyzeSeo(input: SeoInput): SeoReport {
  const checks: SeoCheck[] = [];
  const add = (id: string, group: string, label: string, status: SeoStatus, message: string, weight = 1) =>
    checks.push({ id, group, label, status, message, weight });

  const kw = input.focusKeyword.trim();
  const seoTitle = (input.metaTitle || input.title).trim();
  const md = input.contentMd;
  const text = stripMarkdown(md);
  const wordCount = countWords(text);
  const h1 = md.match(/^#\s+.+$/gm) ?? [];
  const h2 = [...md.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1]);
  const images = [...md.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)];
  const links = [...md.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)/g)].map((m) => m[1]);
  const host = input.siteHost ?? "";
  const internal = links.filter((l) => l.startsWith("/") || l.startsWith("#") || (host && l.includes(host)));
  const external = links.filter((l) => l.startsWith("http") && !internal.includes(l));

  // Mot-clé
  if (kw) add("keyword", "Mot-clé", "Mot-clé principal", "ok", `Mot-clé ciblé : « ${kw} ».`, 2);
  else add("keyword", "Mot-clé", "Mot-clé principal", "fail", "Indiquez la requête exacte que votre client taperait dans Google (ex. « logiciel sur mesure Avignon »).", 2);

  // Titre
  const tl = seoTitle.length;
  if (tl >= 30 && tl <= 60) add("title_length", "Titre", "Longueur du titre SEO", "ok", `${tl} caractères : affichage complet dans Google.`, 2);
  else if (tl === 0) add("title_length", "Titre", "Longueur du titre SEO", "fail", "Ajoutez un titre.", 2);
  else add("title_length", "Titre", "Longueur du titre SEO", "warn", `${tl} caractères : visez 30 à 60 pour éviter la coupure dans les résultats.`, 2);
  if (kw) {
    if (has(seoTitle, kw)) {
      const early = norm(seoTitle).indexOf(norm(kw)) <= 25;
      add("title_keyword", "Titre", "Mot-clé dans le titre", early ? "ok" : "warn", early ? "Le mot-clé est en début de titre." : "Placez le mot-clé plus près du début du titre.", 2);
    } else add("title_keyword", "Titre", "Mot-clé dans le titre", "fail", "Intégrez le mot-clé dans le titre.", 2);
  }

  // Meta description
  const ml = input.metaDescription.trim().length;
  if (ml >= 120 && ml <= 160) add("meta_length", "Meta description", "Longueur", "ok", `${ml} caractères.`, 2);
  else if (ml === 0) add("meta_length", "Meta description", "Longueur", "fail", "Rédigez 120 à 160 caractères : le bénéfice pour le lecteur, puis une incitation à cliquer.", 2);
  else add("meta_length", "Meta description", "Longueur", "warn", `${ml} caractères : visez 120 à 160.`, 2);
  if (kw && ml > 0) {
    const ok = has(input.metaDescription, kw);
    add("meta_keyword", "Meta description", "Mot-clé présent", ok ? "ok" : "warn", ok ? "Le mot-clé est présent." : "Ajoutez le mot-clé : Google le met en gras dans les résultats.");
  }

  // Adresse
  if (input.slug) {
    if (input.slug.length > 60) add("slug", "Adresse", "Adresse de la page", "warn", "Adresse longue : gardez 3 à 5 mots, sans mots vides (le, de, pour…).");
    else if (kw && !has(input.slug, kw)) add("slug", "Adresse", "Adresse de la page", "warn", "Intégrez le mot-clé dans l’adresse.");
    else add("slug", "Adresse", "Adresse de la page", "ok", "Adresse courte et descriptive.");
  }

  // Contenu
  if (wordCount >= 800) add("length", "Contenu", "Longueur", "ok", `${wordCount} mots.`, 2);
  else if (wordCount >= 300) add("length", "Contenu", "Longueur", "warn", `${wordCount} mots : visez 800 et plus pour traiter le sujet en profondeur.`, 2);
  else add("length", "Contenu", "Longueur", "fail", `${wordCount} mots : trop court pour se positionner (minimum 300, idéal 800 et plus).`, 2);

  if (h1.length) add("h1", "Contenu", "Un seul titre principal", "fail", "Retirez les « # Titre » du contenu : le titre de l’article est déjà le H1. Commencez à « ## ».");
  else add("h1", "Contenu", "Un seul titre principal", "ok", "Un seul H1 : le titre de l’article.");

  if (h2.length >= 2) add("h2", "Contenu", "Sous-titres", "ok", `${h2.length} sous-titres.`);
  else add("h2", "Contenu", "Sous-titres", "warn", "Découpez avec au moins 2 sous-titres « ## », formulés comme les questions de vos clients.");

  if (kw) {
    if (h2.length) {
      const ok = h2.some((h) => has(h, kw));
      add("h2_keyword", "Contenu", "Mot-clé dans un sous-titre", ok ? "ok" : "warn", ok ? "Le mot-clé figure dans un sous-titre." : "Utilisez le mot-clé ou une variante dans au moins un sous-titre.");
    }
    const intro = (text.match(/[\p{L}\p{N}’'-]+/gu) ?? []).slice(0, 100).join(" ");
    const okIntro = has(intro, kw);
    add("intro_keyword", "Contenu", "Mot-clé dans l’introduction", okIntro ? "ok" : "warn", okIntro ? "Le mot-clé figure dans les 100 premiers mots." : "Mentionnez le mot-clé dans les 100 premiers mots.");
    if (wordCount > 0) {
      const count = norm(text).split(norm(kw)).length - 1;
      const density = ((count * kw.split(/\s+/).length) / wordCount) * 100;
      if (count === 0) add("density", "Contenu", "Fréquence du mot-clé", "fail", "Le mot-clé n’apparaît pas dans le contenu.");
      else if (density > 3) add("density", "Contenu", "Fréquence du mot-clé", "warn", `${count} occurrences (${density.toFixed(1)} %) : c’est trop, utilisez des synonymes.`);
      else add("density", "Contenu", "Fréquence du mot-clé", "ok", `${count} occurrence(s) (${density.toFixed(1)} %).`);
    }
  }

  // Liens
  add("internal_links", "Liens", "Liens internes", internal.length ? "ok" : "warn", internal.length ? `${internal.length} lien(s) vers d’autres pages du site.` : "Ajoutez au moins un lien vers un service, une page locale ou un autre article.");
  add("external_links", "Liens", "Liens externes", external.length ? "ok" : "warn", external.length ? `${external.length} lien(s) vers des sources externes.` : "Citez au moins une source externe fiable.");

  // Images
  const missingAlt = images.filter((m) => !m[1].trim()).length;
  if (missingAlt) add("img_alt", "Images", "Texte alternatif", "fail", `${missingAlt} image(s) sans texte alternatif : décrivez chaque image.`);
  else if (images.length) add("img_alt", "Images", "Texte alternatif", "ok", "Toutes les images ont un texte alternatif.");
  if (input.coverImageUrl && input.coverImageAlt.trim()) add("cover", "Images", "Image de couverture", "ok", "Image de couverture avec texte alternatif.");
  else if (input.coverImageUrl) add("cover", "Images", "Image de couverture", "warn", "Ajoutez un texte alternatif à l’image de couverture.");
  else add("cover", "Images", "Image de couverture", "warn", "Ajoutez une image de couverture : elle sert aussi d’aperçu lors des partages.");

  add("excerpt", "Contenu", "Extrait", input.excerpt.trim() ? "ok" : "warn", input.excerpt.trim() ? "Extrait renseigné." : "Rédigez 1 à 2 phrases d’extrait pour la liste des articles.");

  const total = checks.reduce((a, c) => a + c.weight, 0);
  const earned = checks.reduce((a, c) => a + c.weight * (c.status === "ok" ? 1 : c.status === "warn" ? 0.5 : 0), 0);
  return { score: total ? Math.round((earned / total) * 100) : 0, wordCount, checks };
}
