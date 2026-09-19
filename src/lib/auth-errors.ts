/** Map Supabase Auth errors to clear, user-facing copy. */

export function friendlyAuthError(message: string | null | undefined): string {
  const raw = (message || "").trim();
  const lower = raw.toLowerCase();

  if (!raw) return "Something went wrong. Please try again.";

  if (
    lower.includes("rate limit") ||
    lower.includes("over_email_send_rate_limit") ||
    lower.includes("email rate limit")
  ) {
    return "Too many confirmation emails were sent. Wait a few minutes, or ask an admin to disable “Confirm email” in Supabase while testing.";
  }

  if (
    lower.includes("email not confirmed") ||
    lower.includes("email_not_confirmed")
  ) {
    return "Confirm your email before signing in. Check your inbox (and spam), or use Resend confirmation below.";
  }

  if (
    lower.includes("invalid login credentials") ||
    lower.includes("invalid_credentials")
  ) {
    return "Incorrect email or password.";
  }

  if (lower.includes("user already registered") || lower.includes("already been registered")) {
    return "An account with this email already exists. Try logging in instead.";
  }

  if (lower.includes("password") && lower.includes("at least")) {
    return "Password must be at least 8 characters.";
  }

  if (lower.includes("unable to validate email") || lower.includes("is invalid")) {
    return "That email address looks invalid. Use a real inbox address (e.g. Gmail).";
  }

  if (lower.includes("provider is not enabled") || lower.includes("unsupported provider")) {
    return "Google sign-in isn’t enabled yet in Supabase Auth providers.";
  }

  return raw;
}

export function isEmailNotConfirmed(message: string | null | undefined): boolean {
  const lower = (message || "").toLowerCase();
  return lower.includes("email not confirmed") || lower.includes("email_not_confirmed");
}

export function isRateLimited(message: string | null | undefined): boolean {
  const lower = (message || "").toLowerCase();
  return (
    lower.includes("rate limit") ||
    lower.includes("over_email_send_rate_limit")
  );
}
