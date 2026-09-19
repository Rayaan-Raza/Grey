import { createClient } from "@supabase/supabase-js";
import type { FullConfig } from "@playwright/test";
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

async function ensureUser(role: "student" | "admin") {
  const emailKey = role === "admin" ? "E2E_ADMIN_EMAIL" : "E2E_STUDENT_EMAIL";
  const passKey = role === "admin" ? "E2E_ADMIN_PASSWORD" : "E2E_STUDENT_PASSWORD";
  if (process.env[emailKey] && process.env[passKey]) return;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey || serviceKey.includes("REPLACE")) return;

  const stamp = Date.now();
  const email = `e2e.${role}.${stamp}@example.com`;
  const password = `E2eTest!${stamp}`;

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: `E2E ${role}`, role },
  });

  if (error) {
    console.warn(`[e2e setup] could not create ${role}:`, error.message);
    return;
  }

  if (data.user) {
    await admin.from("profiles").upsert({
      id: data.user.id,
      full_name: `E2E ${role}`,
      role,
    });
  }

  process.env[emailKey] = email;
  process.env[passKey] = password;
  console.log(`[e2e setup] provisioned ${role} via service role`);
}

export default async function globalSetup(_config: FullConfig) {
  loadEnvLocal();
  await ensureUser("student");
  await ensureUser("admin");
}
