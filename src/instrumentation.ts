// Exécuté une fois au démarrage du serveur : applique les migrations et crée le premier administrateur.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || !process.env.DATABASE_URL) return;
  try {
    const { migrate } = await import("drizzle-orm/postgres-js/migrator");
    const { count } = await import("drizzle-orm");
    const { getDb } = await import("@/db");
    const { users } = await import("@/db/schema");
    const { seed } = await import("@/db/seed-data");
    const { hashPassword } = await import("@/lib/auth");
    const db = getDb()!;
    await migrate(db, { migrationsFolder: "./drizzle" });
    await seed(db);
    const [{ n }] = await db.select({ n: count() }).from(users);
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (n === 0 && email && password) {
      await db.insert(users).values({ email, passwordHash: hashPassword(password) });
      console.log(`[init] Administrateur créé : ${email}`);
    }
    console.log("[init] Base de données prête.");
  } catch (e) {
    console.error("[init] Échec de l'initialisation de la base :", e);
  }
}
