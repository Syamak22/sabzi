import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de votre projet de logiciel sur mesure, d’automatisation ou de site web. Réunion de 30 minutes sans engagement.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container-site grid gap-12 pb-24 pt-10 lg:grid-cols-[2fr_3fr]">
      <div className="flex flex-col gap-5">
        <h1 className="h-display">Parlons de votre projet</h1>
        <p className="text-xl text-muted">30 minutes pour comprendre votre besoin, sans engagement.</p>
        <a href={site.booking} className="btn-primary self-start">Programmer une réunion</a>
        <div className="flex flex-col text-muted">
          <a href={`mailto:${site.email}`} className="py-1.5 underline underline-offset-4 hover:text-brand-dark">{site.email}</a>
          <a href={site.phoneHref} className="py-1.5 underline underline-offset-4 hover:text-brand-dark">{site.phone}</a>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
