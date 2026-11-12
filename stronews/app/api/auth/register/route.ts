import { connectMongo } from "@/lib/mongodb";
import {
  hashPassword,
  isAuthConfigured,
  parseCredentials,
  readRequestJson,
  createAuthToken,
} from "@/lib/auth";
import { ensureUniqueUserEmailIndex, UserModel } from "@/lib/auth/model";

function registrationResponse(
  isFormSubmission: boolean,
  status: number,
  message: string,
  errorCode: string,
) {
  if (isFormSubmission) {
    return new Response(null, {
      status: 303,
      headers: { Location: `/signup?error=${errorCode}`, "Cache-Control": "no-store" },
    });
  }
  return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const isFormSubmission = !request.headers.get("content-type")?.includes("application/json");
  if (!isAuthConfigured()) {
    return registrationResponse(
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
    return registrationResponse(
      isFormSubmission,
      400,
      String(credentials.error),
      "invalid_credentials",
    );
  }

  try {
    await connectMongo();
    try {
      await ensureUniqueUserEmailIndex();
    } catch (error) {
      const duplicateRecords =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000;
      return registrationResponse(
        isFormSubmission,
        duplicateRecords ? 409 : 503,
        duplicateRecords
          ? "Duplicate account records already exist. Contact support to resolve them before creating another account."
          : "Could not verify account uniqueness. Please try again later.",
        duplicateRecords ? "duplicate_accounts" : "service_unavailable",
      );
    }

    const existingUser = await UserModel.findOne({ email: credentials.email }).select("_id").lean();
    if (existingUser) {
      return registrationResponse(
        isFormSubmission,
        409,
        "An account with that email already exists. Please sign in.",
        "account_exists",
      );
    }

    const password = await hashPassword(credentials.password);
    const user = await UserModel.create({ email: credentials.email, ...password });
    if (isFormSubmission) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/login?registered=1", "Cache-Control": "no-store" },
      });
    }
    return Response.json(
      { user: { email: user.email }, token: createAuthToken(String(user._id)) },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return registrationResponse(
        isFormSubmission,
        409,
        "An account with that email already exists.",
        "account_exists",
      );
    }
    return registrationResponse(
      isFormSubmission,
      503,
      "Could not create your account. Check the MongoDB configuration and try again.",
      "service_unavailable",
    );
  }
}
