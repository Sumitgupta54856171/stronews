import {
  createHash,
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";

const SESSION_ISSUER = "stronews";
const SESSION_AUDIENCE = "stronews-web";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
const PASSWORD_KEY_LENGTH = 64;

function derivePasswordKey(password: string, salt: string) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, PASSWORD_KEY_LENGTH, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await derivePasswordKey(password, salt);
  return { passwordSalt: salt, passwordHash: hash.toString("hex") };
}

export async function verifyPassword(password: string, salt: string, storedHash: string) {
  if (!/^[\da-f]{32}$/i.test(salt) || !/^[\da-f]{128}$/i.test(storedHash)) return false;
  const actualHash = await derivePasswordKey(password, salt);
  const expectedHash = Buffer.from(storedHash, "hex");
  return timingSafeEqual(actualHash, expectedHash);
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 bytes.");
  }
  return secret;
}

export function isAuthConfigured() {
  const secret = process.env.AUTH_SECRET;
  return Boolean(process.env.MONGODB_URI && secret && Buffer.byteLength(secret) >= 32);
}

export function isGoogleAuthConfigured() {
  return Boolean(isAuthConfigured() && getGoogleClientConfig());
}

export function getGoogleClientConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

export function getAuthBaseUrl(requestUrl: string) {
  const configuredUrl = process.env.AUTH_URL;
  if (configuredUrl) {
    const url = new URL(configuredUrl);
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
      throw new Error("AUTH_URL must use HTTPS in production.");
    }
    return url.origin;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_URL must be configured for Google sign-in in production.");
  }
  return new URL(requestUrl).origin;
}

export function getCookieValue(request: Request, name: string) {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function createOAuthState() {
  return randomBytes(32).toString("base64url");
}

export function createPkceVerifier() {
  return randomBytes(32).toString("base64url");
}

export function createPkceChallenge(verifier: string) {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function hasMatchingSecret(expected: string | undefined, provided: string | null) {
  if (!expected || !provided || expected.length !== provided.length) return false;
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  return timingSafeEqual(expectedBuffer, providedBuffer);
}

export function setOAuthCookies(response: Response, state: string, verifier: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const options = `; HttpOnly; Path=/api/auth/google; Max-Age=600; SameSite=Lax${secure}`;
  response.headers.append("Set-Cookie", `stronews_oauth_state=${state}${options}`);
  response.headers.append("Set-Cookie", `stronews_pkce_verifier=${verifier}${options}`);
  return response;
}

export function clearOAuthCookies(response: Response) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const options = `; HttpOnly; Path=/api/auth/google; Max-Age=0; SameSite=Lax${secure}`;
  response.headers.append("Set-Cookie", `stronews_oauth_state=${options}`);
  response.headers.append("Set-Cookie", `stronews_pkce_verifier=${options}`);
  return response;
}

export function createAuthToken(userId: string) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const claims = Buffer.from(
    JSON.stringify({
      sub: userId,
      iss: SESSION_ISSUER,
      aud: SESSION_AUDIENCE,
      iat: issuedAt,
      exp: issuedAt + SESSION_TTL_SECONDS,
    }),
  ).toString("base64url");
  const signingInput = `${header}.${claims}`;
  const signature = createHmac("sha256", getAuthSecret()).update(signingInput).digest("base64url");
  return `${signingInput}.${signature}`;
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization) return null;
  const [scheme, token, extra] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token || extra !== undefined) return null;
  return token;
}

export function getAuthenticatedUserId(request: Request) {
  const token = getBearerToken(request);
  if (!token) return null;

  const [header, payload, signature, extra] = token.split(".");
  if (!header || !payload || !signature || extra !== undefined) return null;

  try {
    const signingInput = `${header}.${payload}`;
    const expected = createHmac("sha256", getAuthSecret()).update(signingInput).digest();
    const provided = Buffer.from(signature, "base64url");
    if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return null;

    const decodedHeader: unknown = JSON.parse(Buffer.from(header, "base64url").toString("utf8"));
    if (
      typeof decodedHeader !== "object" ||
      decodedHeader === null ||
      !("alg" in decodedHeader) ||
      decodedHeader.alg !== "HS256" ||
      !("typ" in decodedHeader) ||
      decodedHeader.typ !== "JWT"
    ) {
      return null;
    }

    const claims: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (
      typeof claims !== "object" ||
      claims === null ||
      !("sub" in claims) ||
      typeof claims.sub !== "string" ||
      !("iss" in claims) ||
      claims.iss !== SESSION_ISSUER ||
      !("aud" in claims) ||
      claims.aud !== SESSION_AUDIENCE ||
      !("iat" in claims) ||
      typeof claims.iat !== "number" ||
      claims.iat > now ||
      !("exp" in claims) ||
      typeof claims.exp !== "number" ||
      claims.exp <= now ||
      claims.exp <= claims.iat ||
      claims.exp - claims.iat > SESSION_TTL_SECONDS
    ) {
      return null;
    }

    return claims.sub;
  } catch {
    return null;
  }
}

export function parseCredentials(value: unknown) {
  if (typeof value !== "object" || value === null || !("email" in value) || !("password" in value)) {
    return { error: "Enter your email and password." } as const;
  }

  const { email, password } = value;
  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Enter your email and password." } as const;
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return { error: "Enter a valid email address." } as const;
  }
  if (password.length < 12 || password.length > 128) {
    return { error: "Your password must be between 12 and 128 characters." } as const;
  }

  return { email: normalizedEmail, password } as const;
}

export async function readRequestJson(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
