import { getAuthenticatedUserId, isAuthConfigured } from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";
import { connectMongo } from "@/lib/mongodb";

export async function GET(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Authentication is not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const userId = getAuthenticatedUserId(request);
  if (!userId) {
    return Response.json({ error: "Not signed in." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("email").lean();
    if (!user) {
      return Response.json({ error: "Not signed in." }, { status: 401, headers: { "Cache-Control": "no-store" } });
    }
    return Response.json({ user: { email: user.email } }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json(
      { error: "Could not load your account." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
