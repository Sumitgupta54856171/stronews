import { readRequestJson } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await readRequestJson(request);

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("email" in body) ||
    !("message" in body)
  ) {
    return Response.json(
      { error: "Please provide your name, email, and message." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const { name, email, subject, message } = body as {
    name: unknown;
    email: unknown;
    subject?: unknown;
    message: unknown;
  };

  if (typeof name !== "string" || !name.trim()) {
    return Response.json(
      { error: "Please enter your name." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())
  ) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    return Response.json(
      { error: "Message must contain at least 10 characters." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // In production, log or dispatch to notification service / email
  console.log(`[Contact Form Submission] From: ${name.trim()} <${email.trim()}> | Subject: ${subject || "General"} | Message: ${message.trim().slice(0, 100)}...`);

  return Response.json(
    {
      success: true,
      message:
        "Thank you for contacting Stronews. Your message has been received by our editorial desk and we will review it shortly.",
    },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
