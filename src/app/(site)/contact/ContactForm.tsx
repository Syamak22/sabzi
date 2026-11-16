"use client";

import { startTransition, useActionState } from "react";
import { sendContact, type ContactState } from "./actions";

const field = "min-h-12 rounded-xl border border-[#d9ccc4] bg-white px-4 py-3 text-base";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, null);
  if (state?.ok) {
    return (
      <p role="status" className="card p-8 text-lg">
        {state.message}
      </p>
    );
  }
  return (
    <form
      action={action}
      onSubmit={(e) => {
        // Évite que le formulaire soit vidé si l'envoi échoue.
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        startTransition(() => action(form));
      }}
      className="card flex flex-col gap-5 p-7 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 font-semibold">
          Nom
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 font-semibold">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 font-semibold">
          Entreprise
          <input name="company" autoComplete="organization" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 font-semibold">
          Téléphone
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 font-semibold">
        Votre besoin
        <textarea name="message" required minLength={10} rows={6} className={field} />
      </label>
      <div aria-hidden="true" className="hidden">
        <label>
          Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="source" value="Formulaire de contact" />
      {state && !state.ok && (
        <p role="alert" className="rounded-xl bg-[#fbe0dd] px-4 py-3 text-[#8c1d18]">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary self-start disabled:opacity-60">
        {pending ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
