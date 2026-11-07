export const SESSION_COOKIE = "album_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type Session = { exp: number };

export function isAuthConfigured() {
  return Boolean(process.env.ALBUM_PASSWORD && process.env.AUTH_SECRET);
}

function timingSafeEqual(a: string, b: string) {
  const left = encoder.encode(a);
  const right = encoder.encode(b);

  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);

  for (let i = 0; i < length; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }

  return diff === 0;
}

export function verifyPassword(candidate: string) {
  const expected = process.env.ALBUM_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(candidate, expected);
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);

  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function importKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(expiresAt: number) {
  const key = await importKey();
  if (!key) return null;

  const payload = toBase64Url(encoder.encode(JSON.stringify({ exp: expiresAt })));
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySession(
  value: string | null | undefined
): Promise<Session | null> {
  if (!value) return null;

  const [payload, signature, ...rest] = value.split(".");
  if (!payload || !signature || rest.length > 0) return null;

  const key = await importKey();
  if (!key) return null;

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      encoder.encode(payload)
    );
    if (!valid) return null;

    const session = JSON.parse(decoder.decode(fromBase64Url(payload))) as {
      exp?: unknown;
    };

    if (
      typeof session.exp !== "number" ||
      !Number.isFinite(session.exp) ||
      session.exp <= Date.now()
    ) {
      return null;
    }

    return { exp: session.exp };
  } catch {
    return null;
  }
}
