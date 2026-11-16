import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Back-office", template: "%s | Back-office Sabzi" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen text-[15px] leading-normal">{children}</div>;
}
