// The PIN and the cookie secret live in env vars, never in code.
// The cookie holds an HMAC of the secret, so it can't be forged without it.
export const COOKIE = "vroom_session";

async function hmac(secret: string, msg: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sessionToken() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return hmac(secret, "vroom-unlocked");
}

export async function isValidSession(value: string | undefined) {
  if (!value || !process.env.SESSION_SECRET) return false;
  return value === (await sessionToken());
}
