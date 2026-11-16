import { getDb } from "./index";
import { seed } from "./seed-data";

async function main() {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL manquant");
  await seed(db);
  console.log("Données de départ insérées.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
