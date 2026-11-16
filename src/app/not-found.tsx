import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site flex flex-col items-start gap-5 py-24">
      <h1 className="h-display">Page introuvable</h1>
      <p className="text-xl text-muted">Cette page n’existe pas ou a été déplacée.</p>
      <Link href="/" className="btn-primary">Retour à l’accueil</Link>
    </section>
  );
}
