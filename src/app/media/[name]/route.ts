import { readFile } from "node:fs/promises";
import path from "node:path";
import { mediaDir } from "@/lib/media";

const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", avif: "image/avif" };

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = path.basename((await params).name);
  const type = TYPES[name.split(".").pop() ?? ""];
  if (!type) return new Response("Introuvable", { status: 404 });
  try {
    const data = await readFile(path.join(mediaDir(), name));
    return new Response(new Uint8Array(data), {
      headers: { "content-type": type, "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" },
    });
  } catch {
    return new Response("Introuvable", { status: 404 });
  }
}
