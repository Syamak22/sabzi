// Envoi d'e-mails via Brevo. Sans clé BREVO_API_KEY, rien n'est envoyé.
import { site } from "./site";

export async function notifyNewContact(c: { name: string; email: string; company: string; phone: string; message: string }) {
  const key = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!key || !sender) return;
  const esc = (s: string) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]!);
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "content-type": "application/json" },
      body: JSON.stringify({
        sender: { email: sender, name: site.name },
        to: [{ email: process.env.CONTACT_NOTIFY_EMAIL || site.email }],
        replyTo: { email: c.email, name: c.name },
        subject: `Nouveau contact : ${c.name}${c.company ? ` (${c.company})` : ""}`,
        htmlContent: `<p><strong>${esc(c.name)}</strong> · ${esc(c.email)}${c.phone ? ` · ${esc(c.phone)}` : ""}</p><p>${esc(c.message).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!res.ok) console.error("[brevo]", res.status, await res.text());
  } catch (e) {
    console.error("[brevo]", e);
  }
}
