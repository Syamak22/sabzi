"use client";

import { createContext, startTransition, useActionState, useContext } from "react";

type State = { error: string } | null;

const PendingContext = createContext(false);

// Envoie le formulaire sans le vider : en cas d'erreur, la saisie reste en place.
export function submitWithoutReset(e: React.FormEvent<HTMLFormElement>, dispatch: (form: FormData) => void) {
  e.preventDefault();
  const form = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter);
  startTransition(() => dispatch(form));
}

// Formulaire relié à une action serveur : affiche l'erreur renvoyée, sinon l'action redirige.
export default function ActionForm({
  action,
  children,
  className,
}: {
  action: (prev: State, form: FormData) => Promise<State>;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} onSubmit={(e) => submitWithoutReset(e, formAction)} className={className}>
      {state?.error && (
        <p role="alert" className="rounded-xl bg-[#fbe0dd] px-4 py-3 text-[15px] text-[#8c1d18]">
          {state.error}
        </p>
      )}
      <PendingContext.Provider value={pending}>{children}</PendingContext.Provider>
    </form>
  );
}

export function SubmitButton({
  children,
  intent,
  variant = "admin",
}: {
  children: React.ReactNode;
  intent?: string;
  variant?: "admin" | "quiet";
}) {
  const pending = useContext(PendingContext);
  return (
    <button type="submit" name="intent" value={intent ?? "save"} disabled={pending} className={variant === "admin" ? "btn-admin" : "btn-quiet"}>
      {children}
    </button>
  );
}

export function ConfirmButton({ children, message }: { children: React.ReactNode; message: string }) {
  return (
    <button
      type="submit"
      className="btn-danger"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
