import { connectMongo } from "@/lib/mongodb";
import {
  isAuthConfigured,
  parseCredentials,
  readRequestJson,
  createAuthToken,
  verifyPassword,
} from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Configure MONGODB_URI and a 32-byte AUTH_SECRET to enable accounts." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const credentials = parseCredentials(await readRequestJson(request));
  if ("error" in credentials) {
    return Response.json(
      { error: credentials.error },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    await connectMongo();
    const user = await UserModel.findOne({ email: credentials.email }).select(
      "+passwordHash +passwordSalt",
    );
    if (
      !user ||
      !user.passwordSalt ||
      !user.passwordHash ||
      !(await verifyPassword(credentials.password, user.passwordSalt, user.passwordHash))
    ) {
      return Response.json(
        { error: "Email or password is incorrect." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    return Response.json(
      { user: { email: user.email }, token: createAuthToken(String(user._id)) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not sign in. Check the MongoDB configuration and try again." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
