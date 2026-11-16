"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { marked } from "marked";
import { deletePost, savePost } from "../../../actions";
import { ConfirmButton, submitWithoutReset } from "@/components/admin/ActionForm";
import type { Category, Post } from "@/db/schema";
import { analyzeSeo, type SeoStatus } from "@/lib/seo";
import { slugify } from "@/lib/slug";

const TAG: Record<SeoStatus, { text: string; cls: string }> = {
  ok: { text: "OK", cls: "badge-ok" },
  warn: { text: "À améliorer", cls: "badge-warn" },
  fail: { text: "À corriger", cls: "badge-fail" },
};

export default function PostEditor({ post, categories, siteHost, saved }: { post: Post | null; categories: Category[]; siteHost: string; saved: boolean }) {
  const [state, action, pending] = useActionState(savePost, null);
  const [v, setV] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    contentMd: post?.contentMd ?? "",
    coverImageUrl: post?.coverImageUrl ?? "",
    coverImageAlt: post?.coverImageAlt ?? "",
    metaTitle: post?.metaTitle ?? "",
    metaDescription: post?.metaDescription ?? "",
    focusKeyword: post?.focusKeyword ?? "",
  });
  const [tab, setTab] = useState<"write" | "preview">("write");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }));
  const slug = v.slug || slugify(v.title);
  const report = useMemo(() => analyzeSeo({ ...v, slug, siteHost }), [v, slug, siteHost]);
  const preview = useMemo(() => (tab === "preview" ? (marked.parse(v.contentMd, { async: false }) as string) : ""), [tab, v.contentMd]);
  const groups = [...new Set(report.checks.map((c) => c.group))];
  const scoreColor = report.score >= 80 ? "#125514" : report.score >= 50 ? "#8a5a00" : "#b3261e";
  const published = post?.status === "published";
  const fails = report.checks.filter((c) => c.status === "fail").length;

  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <form action={action} onSubmit={(e) => submitWithoutReset(e, action)} className="flex min-w-0 flex-1 flex-col gap-5">
        {post && <input type="hidden" name="id" value={post.id} />}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="font-arvo text-[1.75rem]">{post ? "Modifier l’article" : "Nouvel article"}</h1>
            <span className={`badge ${published ? "badge-ok" : "badge-warn"}`}>{published ? "Publié" : "Brouillon"}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {published && (
              <Link href={`/blog/${post!.slug}`} target="_blank" className="btn-quiet">Voir en ligne</Link>
            )}
            <button type="submit" name="intent" value="save" disabled={pending} className="btn-quiet">Enregistrer</button>
            {published ? (
              <button type="submit" name="intent" value="unpublish" disabled={pending} className="btn-quiet">Repasser en brouillon</button>
            ) : (
              <button type="submit" name="intent" value="publish" disabled={pending} className="btn-admin">Publier</button>
            )}
          </div>
        </div>
        {saved && !state && <p role="status" className="rounded-xl bg-[#ddebdd] px-4 py-3 text-[#14522c]">Modifications enregistrées.</p>}
        {state?.error && <p role="alert" className="rounded-xl bg-[#fbe0dd] px-4 py-3 text-[#8c1d18]">{state.error}</p>}

        <div className="panel flex flex-col gap-4">
          <label className="label">
            Titre
            <input name="title" value={v.title} onChange={set("title")} required className="input !font-arvo !text-2xl" />
          </label>
          <label className="label">
            Adresse de la page
            <input name="slug" value={v.slug} onChange={set("slug")} placeholder={slugify(v.title)} className="input" />
            <span className="hint">{siteHost}/blog/{slug}</span>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label">
              Mot-clé principal
              <input name="focusKeyword" value={v.focusKeyword} onChange={set("focusKeyword")} placeholder="ex. logiciel sur mesure Avignon" className="input" />
            </label>
            <label className="label">
              Catégorie
              <select name="categoryId" defaultValue={post?.categoryId ?? ""} className="input">
                <option value="">Aucune</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="label">
            Extrait
            <textarea name="excerpt" value={v.excerpt} onChange={set("excerpt")} rows={2} className="input" />
            <span className="hint">1 à 2 phrases affichées dans la liste des articles et sous le titre.</span>
          </label>
        </div>

        <div className="panel flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-semibold" id="content-label">Contenu</span>
            <div role="tablist" aria-label="Mode d’édition" className="flex gap-1.5">
              <button type="button" role="tab" aria-selected={tab === "write"} onClick={() => setTab("write")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "write" ? "bg-ink text-white" : "bg-ground"}`}>Rédaction</button>
              <button type="button" role="tab" aria-selected={tab === "preview"} onClick={() => setTab("preview")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "preview" ? "bg-ink text-white" : "bg-ground"}`}>Aperçu</button>
            </div>
          </div>
          <textarea
            name="contentMd"
            aria-labelledby="content-label"
            value={v.contentMd}
            onChange={set("contentMd")}
            rows={22}
            hidden={tab !== "write"}
            className="input !text-base !leading-relaxed font-mono"
          />
          {tab === "preview" && <div className="prose-sabzi min-h-[300px] rounded-[10px] border border-line p-5" dangerouslySetInnerHTML={{ __html: preview }} />}
          <p className="hint">
            {report.wordCount} mots · Markdown : <code>## Sous-titre</code>, <code>**gras**</code>, <code>[texte](/adresse)</code>, <code>![description](/media/image.jpg)</code>
          </p>
        </div>

        <div className="panel flex flex-col gap-4">
          <h2 className="text-lg font-bold">Référencement et partage</h2>
          <label className="label">
            Titre SEO <span className="hint">({(v.metaTitle || v.title).length} / 60) Laissez vide pour reprendre le titre.</span>
            <input name="metaTitle" value={v.metaTitle} onChange={set("metaTitle")} className="input" />
          </label>
          <label className="label">
            Meta description <span className="hint">({v.metaDescription.length} / 160)</span>
            <textarea name="metaDescription" value={v.metaDescription} onChange={set("metaDescription")} rows={2} className="input" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label">
              Image de couverture (adresse)
              <input name="coverImageUrl" value={v.coverImageUrl} onChange={set("coverImageUrl")} placeholder="/media/…" className="input" />
              <span className="hint">Copiez l’adresse depuis la page Médias.</span>
            </label>
            <label className="label">
              Texte alternatif de la couverture
              <input name="coverImageAlt" value={v.coverImageAlt} onChange={set("coverImageAlt")} className="input" />
            </label>
          </div>
        </div>
      </form>

      <aside aria-label="Consignes SEO" className="flex w-full flex-col gap-5 xl:sticky xl:top-6 xl:w-[380px]">
        <div className="panel flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold">Score SEO</h2>
            <span className="font-arvo text-4xl" style={{ color: scoreColor }}>
              {report.score}
              <span className="text-base text-soft"> / 100</span>
            </span>
          </div>
          <div role="img" aria-label={`Score : ${report.score} sur 100`} className="flex h-2.5 rounded-full bg-line">
            <span className="rounded-full" style={{ width: `${report.score}%`, background: scoreColor }} />
          </div>
          <p className="text-sm text-muted">
            {fails > 0
              ? `${fails} point(s) à corriger avant de publier.`
              : report.score >= 80
                ? "Prêt à publier."
                : "Correct. Traitez les points à améliorer pour gagner des places."}
          </p>
        </div>

        <div className="panel flex flex-col gap-2">
          <h2 className="font-bold">Aperçu dans Google</h2>
          <span className="text-[13px] text-muted">{siteHost} › blog › {slug}</span>
          <span className="text-lg leading-snug text-[#1a3fa8]">{v.metaTitle || v.title || "Titre de l’article"}</span>
          <span className="text-sm text-muted">{v.metaDescription || v.excerpt || "La meta description apparaîtra ici."}</span>
        </div>

        {groups.map((g) => (
          <div key={g} className="panel flex flex-col gap-2.5">
            <h2 className="font-bold">{g}</h2>
            {report.checks
              .filter((c) => c.group === g)
              .map((c) => (
                <div key={c.id} className="flex flex-col gap-1 rounded-xl border border-line p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{c.label}</span>
                    <span className={`badge ${TAG[c.status].cls}`}>{TAG[c.status].text}</span>
                  </div>
                  <span className="text-sm text-muted">{c.message}</span>
                </div>
              ))}
          </div>
        ))}

        {post && (
          <form action={deletePost} className="flex">
            <input type="hidden" name="id" value={post.id} />
            <ConfirmButton message="Supprimer définitivement cet article ?">Supprimer l’article</ConfirmButton>
          </form>
        )}
      </aside>
    </div>
  );
}
