const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
const facebookEnabled = process.env.NEXT_PUBLIC_FACEBOOK_AUTH_ENABLED === "true";

export function isOAuthProviderEnabled(provider: "google" | "facebook") {
  return provider === "google" ? googleEnabled : facebookEnabled;
}

export function getOAuthProviderSetupMessage(provider: "google" | "facebook") {
  const label = provider === "google" ? "Google" : "Facebook";

  return `${label} sign-in is not enabled for this environment yet. Enable the provider in Supabase and set NEXT_PUBLIC_${label.toUpperCase()}_AUTH_ENABLED=true.`;
}