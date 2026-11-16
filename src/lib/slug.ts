export function slugify(text: string): string {
  return (
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 200) || "sans-titre"
  );
}

export function countWords(text: string): number {
  return (text.match(/[\p{L}\p{N}]+/gu) ?? []).length;
}
