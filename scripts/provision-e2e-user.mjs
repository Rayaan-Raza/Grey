/**
 * Provision a confirmed Auth user via Admin API (no confirmation email).
 * Requires SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL in env/.env.local
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.E2E_STUDENT_EMAIL || `e2e.student.${Date.now()}@example.com`;
const password = process.env.E2E_STUDENT_PASSWORD || `E2eTest!${Date.now()}`;
const role = process.env.E2E_ROLE || "student";

if (!url || !serviceKey || serviceKey.includes("REPLACE")) {
  console.error(
    "Set a real SUPABASE_SERVICE_ROLE_KEY in .env.local to provision E2E users.",
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: "E2E Browser Agent", role },
});

if (error) {
  console.error("createUser failed:", error.message);
  process.exit(1);
}

if (data.user) {
  await admin.from("profiles").upsert({
    id: data.user.id,
    full_name: "E2E Browser Agent",
    role,
  });
}

console.log("Provisioned user:");
console.log(`E2E_STUDENT_EMAIL=${email}`);
console.log(`E2E_STUDENT_PASSWORD=${password}`);
if (role === "admin") {
  console.log(`E2E_ADMIN_EMAIL=${email}`);
  console.log(`E2E_ADMIN_PASSWORD=${password}`);
}
