import Image from "next/image";
import { redirect } from "next/navigation";
import ActionForm, { SubmitButton } from "@/components/admin/ActionForm";
import { getSessionUser } from "@/lib/auth";
import { login } from "../../actions";

export const metadata = { title: "Connexion" };

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/admin");
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-8 px-5 py-12">
      <Image src="/logo_orange.png" alt="Sabzi" width={334} height={130} priority className="h-10 w-auto self-start" />
      <div className="flex flex-col gap-1">
        <h1 className="font-arvo text-3xl">Back-office</h1>
        <p className="text-muted">Connectez-vous pour gérer le site.</p>
      </div>
      <ActionForm action={login} className="panel flex flex-col gap-5">
        <label className="label">
          E-mail
          <input name="email" type="email" required autoComplete="username" className="input" />
        </label>
        <label className="label">
          Mot de passe
          <input name="password" type="password" required autoComplete="current-password" className="input" />
        </label>
        <SubmitButton>Se connecter</SubmitButton>
      </ActionForm>
    </main>
  );
}
