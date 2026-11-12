import { NextResponse, type NextRequest } from "next/server";
import { REWARDS_ENABLED } from "@/lib/rewards/feature";

export function proxy(request: NextRequest) {
  if (REWARDS_ENABLED || !request.nextUrl.pathname.startsWith("/api/rewards/")) {
    return NextResponse.next();
  }

  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export const config = {
  matcher: ["/api/rewards", "/api/rewards/:path*"],
};
