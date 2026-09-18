import Stripe from "stripe";

/** True when placeholder/dummy keys are in use — swap env values to go live. */
export function isStripeDemoMode() {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  return (
    !key ||
    key.includes("dummy") ||
    key.includes("REPLACE") ||
    key === "sk_test_dummy"
  );
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || isStripeDemoMode()) {
    throw new Error("Stripe is in demo mode — set a real STRIPE_SECRET_KEY");
  }
  return new Stripe(key);
}
