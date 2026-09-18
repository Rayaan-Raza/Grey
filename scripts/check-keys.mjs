import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
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

const env = loadEnv(envPath);
const checks = [];

function add(name, ok, detail) {
  checks.push({ name, ok, detail });
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
}

const url = (env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

add("Supabase URL present", Boolean(url), url || "missing");
add(
  "Supabase URL shape",
  /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url) && !url.includes("/rest/"),
  url.includes("/rest/") ? "remove /rest/v1" : "ok",
);
add(
  "Anon key present",
  Boolean(anon) && anon.startsWith("eyJ"),
  anon ? `jwt length ${anon.length}` : "missing",
);

if (url && anon.startsWith("eyJ")) {
  const sb = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: dbError } = await sb.from("profiles").select("id").limit(1);
  add(
    "Supabase DB (anon key)",
    !dbError,
    dbError ? dbError.message : "profiles query ok",
  );

  const { error: authError } = await sb.auth.getSession();
  add(
    "Supabase Auth client",
    !authError,
    authError ? authError.message : "reachable",
  );

  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: anon },
    });
    add("Supabase Auth health", res.ok, `HTTP ${res.status}`);
  } catch (e) {
    add("Supabase Auth health", false, e instanceof Error ? e.message : "fail");
  }
}

const sk = env.STRIPE_SECRET_KEY || "";
const pk = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const wh = env.STRIPE_WEBHOOK_SECRET || "";
const demo =
  !sk ||
  sk.includes("dummy") ||
  sk.includes("REPLACE") ||
  sk === "sk_test_dummy";

add("Stripe secret present", Boolean(sk), sk ? `prefix ${sk.slice(0, 8)}…` : "missing");
add(
  "Stripe publishable present",
  Boolean(pk),
  pk ? `prefix ${pk.slice(0, 8)}…` : "missing",
);
add("Stripe webhook secret present", Boolean(wh), wh ? "set" : "missing");
add(
  "Stripe demo mode",
  true,
  demo
    ? "ON (dummy keys — expected until you swap real keys)"
    : "OFF (looks like a real key)",
);

if (!demo && sk.startsWith("sk_")) {
  try {
    const stripe = new Stripe(sk);
    await stripe.balance.retrieve();
    add("Stripe API call", true, "balance.retrieve succeeded");
  } catch (e) {
    add("Stripe API call", false, e instanceof Error ? e.message : "fail");
  }
} else {
  add("Stripe API call", false, "skipped — still using dummy key");
}

const service = env.SUPABASE_SERVICE_ROLE_KEY || "";
const serviceOk =
  Boolean(service) &&
  !service.includes("REPLACE") &&
  !service.includes("dummy") &&
  service.startsWith("eyJ");
add(
  "Supabase service_role",
  serviceOk,
  serviceOk ? "set" : "placeholder — fine until live Stripe webhooks",
);

const critical = checks.filter((c) =>
  [
    "Supabase URL present",
    "Supabase URL shape",
    "Anon key present",
    "Supabase DB (anon key)",
    "Supabase Auth client",
    "Supabase Auth health",
  ].includes(c.name),
);
const failed = critical.filter((c) => !c.ok);
console.log(
  `\nSupabase: ${critical.length - failed.length}/${critical.length} critical checks passed`,
);
console.log(
  `Stripe: ${demo ? "demo keys only (not live yet)" : "real key configured"}\n`,
);
process.exit(failed.length ? 1 : 0);
