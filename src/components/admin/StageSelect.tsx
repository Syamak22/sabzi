"use client";

import { useTransition } from "react";
import { STAGES } from "@/lib/stages";

export default function StageSelect({ id, stage, name, onChange }: { id: number; stage: string; name: string; onChange: (id: number, stage: string) => Promise<void> }) {
  const [pending, start] = useTransition();
  return (
    <select
      aria-label={`Étape de ${name}`}
      defaultValue={stage}
      disabled={pending}
      onChange={(e) => start(() => onChange(id, e.target.value))}
      className="input !min-h-10 !py-1.5 !text-sm"
    >
      {STAGES.map((s) => (
        <option key={s.id} value={s.id}>{s.label}</option>
      ))}
    </select>
  );
}
