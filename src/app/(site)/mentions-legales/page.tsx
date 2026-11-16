import type { Metadata } from "next";
import { legal, site } from "@/lib/site";

const complete = Object.values(legal).every((v) => v.trim() !== "");

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: complete ? undefined : { index: false },
};

const todo = <span className="rounded bg-[#fff1d6] px-1.5 text-[#6b4500]">à compléter</span>;

export default function LegalPage() {
  return (
    <section className="container-site flex max-w-3xl flex-col gap-8 pb-24 pt-10">
      <h1 className="h-display">Mentions légales</h1>
      <div className="prose-sabzi">
        <h2>Éditeur du site</h2>
        <p>
          {legal.editor}, {legal.status || todo}
          <br />
          SIRET : {legal.siret || todo}
          <br />
          Adresse : {legal.address || todo}
          <br />
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a> · Téléphone : {site.phone}
        </p>
        <h2>Directeur de la publication</h2>
        <p>{legal.editor}</p>
        <h2>Hébergement</h2>
        <p>{legal.host || todo}</p>
        <h2>Données personnelles</h2>
        <p>
          Les informations saisies dans le formulaire de contact (nom, e-mail, entreprise, téléphone, message) servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni transmises à des tiers. Vous pouvez demander leur consultation, leur rectification ou leur suppression en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>Cookies</h2>
        <p>Ce site ne dépose aucun cookie publicitaire. La vidéo de présentation est hébergée par YouTube et n’est chargée qu’après un clic de votre part.</p>
      </div>
    </section>
  );
}
