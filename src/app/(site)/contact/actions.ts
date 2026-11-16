"use server";

import { getDb } from "@/db";
import { contacts } from "@/db/schema";
import { notifyNewContact } from "@/lib/brevo";

export type ContactState = { ok: boolean; message: string } | null;

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  // Pot de miel : un humain ne remplit pas ce champ masqué.
  if (get("website")) return { ok: true, message: "Merci, votre message a bien été envoyé." };

  const name = get("name");
  const email = get("email");
  const message = get("message");
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 10) {
    return { ok: false, message: "Merci d’indiquer votre nom, un e-mail valide et un message d’au moins 10 caractères." };
  }
  const db = getDb();
  if (!db) return { ok: false, message: "L’envoi est indisponible pour le moment. Écrivez-moi directement par e-mail." };
  try {
    const row = {
      name: name.slice(0, 160),
      email: email.slice(0, 255),
      company: get("company").slice(0, 160),
      phone: get("phone").slice(0, 40),
      message: message.slice(0, 5000),
      source: get("source").slice(0, 500),
    };
    await db.insert(contacts).values(row);
    await notifyNewContact(row);
    return { ok: true, message: "Merci, votre message a bien été envoyé. Je vous réponds sous 48 heures." };
  } catch (e) {
    console.error("[contact]", e);
    return { ok: false, message: "Une erreur est survenue. Écrivez-moi directement par e-mail." };
  }
}
