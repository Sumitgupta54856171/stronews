import { connectMongo } from "@/lib/mongodb";
import {
  isAuthConfigured,
  parseCredentials,
  readRequestJson,
  createAuthToken,
  verifyPassword,
} from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";

function loginResponse(
  isFormSubmission: boolean,
  status: number,
  message: string,
  errorCode: string,
) {
  if (isFormSubmission) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/login?error=${errorCode}`,
        "Cache-Control": "no-store",
      },
    });
  }
  return Response.json(
    { error: message, code: errorCode },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const isFormSubmission = !request.headers.get("content-type")?.includes("application/json");

  if (!isAuthConfigured()) {
    return loginResponse(
      isFormSubmission,
      503,
      "Configure MONGODB_URI and a 32-byte AUTH_SECRET to enable accounts.",
      "service_unavailable",
    );
  }

  let submittedCredentials: unknown;
  if (isFormSubmission) {
    try {
      const formData = await request.formData();
      submittedCredentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
    } catch {
      submittedCredentials = null;
    }
  } else {
    submittedCredentials = await readRequestJson(request);
  }

  const credentials = parseCredentials(submittedCredentials);
  if ("error" in credentials) {
    return loginResponse(
      isFormSubmission,
      400,
      String(credentials.error),
      "invalid_credentials",
    );
  }

  try {
    await connectMongo();
    const user = await UserModel.findOne({ email: credentials.email }).select(
      "+passwordHash +passwordSalt",
    );

    // 1. Check if the user email exists in the system
    if (!user) {
      return loginResponse(
        isFormSubmission,
        404,
        "No account found with this email. Please check your email or sign up.",
        "user_not_found",
      );
    }

    // 2. Check if the password matches
    if (
      !user.passwordSalt ||
      !user.passwordHash ||
      !(await verifyPassword(credentials.password, user.passwordSalt, user.passwordHash))
    ) {
      return loginResponse(
        isFormSubmission,
        401,
        "Incorrect password. Please try again.",
        "wrong_password",
      );
    }

    const token = createAuthToken(String(user._id));

    if (isFormSubmission) {
      // In form submission mode, redirect with token cookie so user is logged in
      const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
      return new Response(null, {
        status: 303,
        headers: {
          Location: "/",
          "Set-Cookie": `stronews_token=${token}; Path=/; Max-Age=604800; SameSite=Lax${secure}`,
          "Cache-Control": "no-store",
        },
      });
    }

    return Response.json(
      { user: { email: user.email }, token },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return loginResponse(
      isFormSubmission,
      503,
      "Could not sign in. Check the database configuration and try again.",
      "service_unavailable",
    );
  }
}
