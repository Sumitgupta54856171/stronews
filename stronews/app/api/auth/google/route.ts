import {
  createOAuthState,
  createPkceChallenge,
  createPkceVerifier,
  getAuthBaseUrl,
  getGoogleClientConfig,
  isGoogleAuthConfigured,
  setOAuthCookies,
} from "@/lib/auth";

function redirectToLogin(request: Request, error: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", error);
  return new Response(null, {
    status: 303,
    headers: { Location: url.toString(), "Cache-Control": "no-store" },
  });
}

export async function GET(request: Request) {
  const googleConfig = getGoogleClientConfig();
  if (!isGoogleAuthConfigured() || !googleConfig) {
    return redirectToLogin(request, "google_unavailable");
  }

  try {
    const state = createOAuthState();
    const verifier = createPkceVerifier();
    const callbackUrl = new URL("/api/auth/google/callback", getAuthBaseUrl(request.url));
    const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authorizationUrl.search = new URLSearchParams({
      client_id: googleConfig.clientId,
      redirect_uri: callbackUrl.toString(),
      response_type: "code",
      scope: "openid email profile",
      state,
      code_challenge: createPkceChallenge(verifier),
      code_challenge_method: "S256",
      prompt: "select_account",
    }).toString();

    return setOAuthCookies(
      new Response(null, {
        status: 303,
        headers: {
          Location: authorizationUrl.toString(),
          "Cache-Control": "no-store",
        },
      }),
      state,
      verifier,
    );
  } catch {
    return redirectToLogin(request, "google_unavailable");
  }
}
