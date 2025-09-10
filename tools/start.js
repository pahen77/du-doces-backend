// tools/start.js
import { execSync } from "node:child_process";

const run = (cmd) => {
  console.log(`[start] ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
};

try {
  // opcional: rode o seed uma única vez controlado por variável de ambiente
  if (process.env.SEED_ON_BOOT === "true") {
    run("npm run db:seed");
  }
} catch (e) {
  console.error("[start] erro ao executar seed:", e?.message || e);
}

// por fim, sobe o servidor
import("../src/index.js");
