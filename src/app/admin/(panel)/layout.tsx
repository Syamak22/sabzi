import { count, eq } from "drizzle-orm";
import Sidebar from "@/components/admin/Sidebar";
import { getDb } from "@/db";
import { contacts } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  const [{ n }] = await getDb()!.select({ n: count() }).from(contacts).where(eq(contacts.stage, "nouveau"));
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar email={user.email} logout={logout} unread={n} />
      <main className="flex min-w-0 flex-1 flex-col gap-6 px-5 py-7 sm:px-8">{children}</main>
    </div>
  );
}
