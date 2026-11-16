import { marked } from "marked";

// Le contenu vient uniquement du back-office (administrateur authentifié).
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false, gfm: true }) as string;
}

export function formatDate(d: Date | null): string {
  if (!d) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(d);
}
