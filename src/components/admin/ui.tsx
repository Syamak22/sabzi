import Link from "next/link";

export function PageHeader({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="font-arvo text-[1.75rem] leading-tight">{title}</h1>
        {text && <p className="text-[15px] text-muted">{text}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2.5">{children}</div>}
    </div>
  );
}

export function Saved({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p role="status" className="rounded-xl bg-[#ddebdd] px-4 py-3 text-[15px] text-[#14522c]">
      Modifications enregistrées.
    </p>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return status === "published" ? <span className="badge badge-ok">Publié</span> : <span className="badge badge-warn">Brouillon</span>;
}

export function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 80 ? "badge-ok" : score >= 50 ? "badge-warn" : "badge-fail";
  return <span className={`badge ${cls}`}>{score} / 100</span>;
}

export function Empty({ text, href, cta }: { text: string; href?: string; cta?: string }) {
  return (
    <div className="panel flex flex-col items-start gap-3 text-muted">
      <p>{text}</p>
      {href && cta && (
        <Link href={href} className="btn-admin">
          {cta}
        </Link>
      )}
    </div>
  );
}
