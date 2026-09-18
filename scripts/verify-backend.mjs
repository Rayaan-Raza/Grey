import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env.local");

function loadEnv(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    out[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim();
  }
  return out;
}

const env = { ...loadEnv(envPath), ...process.env };
const url = env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const results = [];
function pass(name, detail = "") {
  results.push({ ok: true, name, detail });
  console.log(`✓ ${name}${detail ? ` — ${detail}` : ""}`);
}
function fail(name, detail = "") {
  results.push({ ok: false, name, detail });
  console.error(`✗ ${name}${detail ? ` — ${detail}` : ""}`);
}

console.log("\nGrey Dental backend verifier\n");

if (!url) fail("Env URL", "NEXT_PUBLIC_SUPABASE_URL missing");
else if (url.includes("/rest/v1"))
  fail("Env URL", "Remove /rest/v1 from NEXT_PUBLIC_SUPABASE_URL");
else if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url.replace(/\/$/, "")))
  fail("Env URL", `Unexpected shape: ${url}`);
else pass("Env URL", url.replace(/\/$/, ""));

if (!key) fail("Env anon key", "NEXT_PUBLIC_SUPABASE_ANON_KEY missing");
else if (!key.startsWith("eyJ")) fail("Env anon key", "Expected a JWT starting with eyJ");
else pass("Env anon key", `length ${key.length}`);

if (!url || !key || results.some((r) => !r.ok)) {
  console.error("\nStopped early — fix env first.\n");
  process.exit(1);
}

const supabase = createClient(url.replace(/\/$/, ""), key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const requiredTables = [
  "profiles",
  "courses",
  "enrollments",
  "workshops",
  "resources",
  "workshop_registrations",
  "orders",
  "assessments",
  "assessment_submissions",
  "certificate_templates",
  "certificates",
  "assessment_questions",
];

for (const table of requiredTables) {
  const { data, error, count } = await supabase
    .from(table)
    .select("*", { count: "exact" })
    .limit(1);

  if (error) {
    fail(`Table ${table}`, error.message);
  } else {
    pass(
      `Table ${table}`,
      `ok (${count ?? data?.length ?? 0} rows visible)`,
    );
  }
}

const { data: authData, error: authError } =
  await supabase.auth.getSession();
if (authError) fail("Auth API", authError.message);
else pass("Auth API", "reachable");

const failed = results.filter((r) => !r.ok);
console.log(
  `\n${results.length - failed.length}/${results.length} checks passed\n`,
);

if (failed.length) {
  console.error("Next steps:");
  console.error(
    "- If tables are missing, run schema.sql → schema_lms.sql → schema_lms_v2.sql in the SQL Editor.",
  );
  console.error("- Confirm .env.local URL has no /rest/v1 suffix.\n");
  process.exit(1);
}

console.log("Phase 3.1–3.2 foundation looks healthy.\n");
process.exit(0);
