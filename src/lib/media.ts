import path from "node:path";

// Dossier des images envoyées depuis le back-office. Sur Railway, pointer MEDIA_DIR vers un volume persistant.
export function mediaDir(): string {
  return path.resolve(process.env.MEDIA_DIR || "./uploads");
}
