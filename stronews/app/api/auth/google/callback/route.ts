import {
  clearOAuthCookies,
  getAuthBaseUrl,
  getCookieValue,
  getGoogleClientConfig,
  hasMatchingSecret,
  isGoogleAuthConfigured,
  createAuthToken,
} from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";
import { connectMongo } from "@/lib/mongodb";

type GoogleProfile = {
  sub: string;
  email: string;
  email_verified: boolean;
};

class ExistingEmailAccountError extends Error {}

function isGoogleProfile(value: unknown): value is GoogleProfile {
  return (
    typeof value === "object" &&
    value !== null &&
    "sub" in value &&
    typeof value.sub === "string" &&
    value.sub.length > 0 &&
    "email" in value &&
    typeof value.email === "string" &&
    value.email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) &&
    "email_verified" in value &&
    value.email_verified === true
  );
}

function loginRedirect(request: Request, error: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", error);
  return clearOAuthCookies(
    new Response(null, {
      status: 303,
      headers: { Location: url.toString(), "Cache-Control": "no-store" },
    }),
  );
}

async function findOrCreateGoogleUser(profile: GoogleProfile) {
  const email = profile.email.trim().toLowerCase();
  let user = await UserModel.findOne({ googleId: profile.sub });
  if (user) return user;

  const existingUser = await UserModel.findOne({ email }).select("+googleId");
  if (existingUser?.googleId && existingUser.googleId !== profile.sub) {
    throw new Error("This email is already linked to another Google account.");
  }
  if (existingUser?.googleId === profile.sub) return existingUser;
  if (existingUser) {
    throw new ExistingEmailAccountError();
  }

  try {
    return await UserModel.create({ email, googleId: profile.sub });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      user = await UserModel.findOne({ googleId: profile.sub });
      if (user) return user;
      if (await UserModel.exists({ email })) {
        throw new ExistingEmailAccountError();
      }
    }
    throw error;
  }
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const returnedState = requestUrl.searchParams.get("state");
  const cookieState = getCookieValue(request, "stronews_oauth_state");
  const verifier = getCookieValue(request, "stronews_pkce_verifier");
  if (!hasMatchingSecret(cookieState, returnedState) || !verifier) {
    return loginRedirect(request, "google_failed");
  }
  if (requestUrl.searchParams.has("error") || !requestUrl.searchParams.get("code")) {
    return loginRedirect(request, "google_failed");
  }
  const googleConfig = getGoogleClientConfig();
  if (!isGoogleAuthConfigured() || !googleConfig) {
    return loginRedirect(request, "google_unavailable");
  }

  try {
    const callbackUrl = new URL("/api/auth/google/callback", getAuthBaseUrl(request.url));
    const code = requestUrl.searchParams.get("code");
    if (!code) return loginRedirect(request, "google_failed");
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: googleConfig.clientId,
        client_secret: googleConfig.clientSecret,
        code,
        code_verifier: verifier,
        grant_type: "authorization_code",
        redirect_uri: callbackUrl.toString(),
      }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) return loginRedirect(request, "google_failed");

    const tokenResult: unknown = await tokenResponse.json();
    if (
      typeof tokenResult !== "object" ||
      tokenResult === null ||
      !("access_token" in tokenResult) ||
      typeof tokenResult.access_token !== "string"
    ) {
      return loginRedirect(request, "google_failed");
    }

    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenResult.access_token}` },
      cache: "no-store",
    });
    if (!profileResponse.ok) return loginRedirect(request, "google_failed");

    const profile: unknown = await profileResponse.json();
    if (!isGoogleProfile(profile)) return loginRedirect(request, "google_unverified");

    await connectMongo();
    const user = await findOrCreateGoogleUser(profile);
    const redirectUrl = new URL("/auth/callback", request.url);
    redirectUrl.hash = `token=${encodeURIComponent(createAuthToken(String(user._id)))}`;
    const response = new Response(null, {
      status: 303,
      headers: {
        Location: redirectUrl.toString(),
        "Cache-Control": "no-store",
      },
    });
    return clearOAuthCookies(response);
  } catch (error) {
    if (error instanceof ExistingEmailAccountError) {
      return loginRedirect(request, "google_account_exists");
    }
    return loginRedirect(request, "google_failed");
  }
}
