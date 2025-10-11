// scripts/save.mjs
import { execSync, spawnSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true });

// 1) Stage everything
run("git add -A");

// 2) Ako nema ništa u stageu, izađi
const diff = spawnSync("git", ["diff", "--cached", "--quiet"], { shell: true });
if (diff.status === 0) {
  console.log("No changes to save.");
  process.exit(0);
}

// 3) Commit poruka: custom ili timestamp
const custom = process.argv.slice(2).join(" ").trim();
const pad = (n) => String(n).padStart(2, "0");
const now = new Date();
const msg =
  custom ||
  `save: ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

// 4) Commit + push
run(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
run("git push");
