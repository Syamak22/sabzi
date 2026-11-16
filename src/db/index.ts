import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = PostgresJsDatabase<typeof schema>;
const globalForDb = globalThis as unknown as { __sabziDb?: Db };

// Renvoie null si DATABASE_URL n'est pas défini : le site s'affiche alors sans contenu dynamique.
export function getDb(): Db | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.__sabziDb) {
    globalForDb.__sabziDb = drizzle(postgres(url, { max: 5, onnotice: () => {} }), { schema });
  }
  return globalForDb.__sabziDb;
}
