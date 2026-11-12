"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAuthToken } from "@/lib/auth-client";
import { useToast } from "@/components/ui/toast-provider";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const isSignup = mode === "signup";

  useEffect(() => {
    const messages: Record<string, string> = {
      google_failed: "Google sign-in didn't complete. Please try again.",
      google_account_exists: "An account with this email already exists. Sign in with email and password.",
      google_unavailable: "Google sign-in isn't configured yet.",
      google_unverified: "Use a Google account with a verified email address.",
      invalid_credentials: "Enter a valid email address and a password between 12 and 128 characters.",
      account_exists: "An account with that email already exists. Please sign in.",
      duplicate_accounts: "Multiple accounts already use this email. Contact support to safely resolve the existing records.",
      service_unavailable: "We couldn’t create your account. Please try again shortly.",
    };
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("error");
    if (code && messages[code]) toast.error(messages[code]);
    if (!isSignup && searchParams.get("registered") === "1") {
      toast.success("Your account has been created. Please sign in.");
    }
  }, [toast]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/auth/${isSignup ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof result === "object" && result !== null && "error" in result &&
            typeof result.error === "string"
            ? result.error
            : "Could not complete your request.";
        setError(message);
        toast.error(message);
        return;
      }

      if (
        typeof result !== "object" ||
        result === null ||
        !("token" in result) ||
        typeof result.token !== "string" ||
        !result.token
      ) {
        const message = "The server did not return a valid authentication token.";
        setError(message);
        toast.error(message);
        return;
      }

      setAuthToken(result.token);
      toast.success(isSignup ? "Your account has been created." : "You’re signed in.");
      const requestedPath = new URLSearchParams(window.location.search).get("next");
      const nextPath =
        requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/";
      router.push(nextPath);
      router.refresh();
    } catch {
      const message = "Could not reach the server. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-[440px] flex-1 items-center px-4 py-12 sm:px-7">
      <section className="w-full rounded-xl border border-[#e2dfd7] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#176f58]">
          Stronews account
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#171918]">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          {isSignup
            ? "Sign up to get started with your Stronews account."
            : "Sign in to continue to Stronews."}
        </p>

        <form
          action={isSignup ? "/api/auth/register" : "/login"}
          className="mt-6 space-y-4"
          method="post"
          onSubmit={handleSubmit}
        >
          <label className="block space-y-1.5 text-sm font-medium text-[#272a28]">
            Email
            <Input
              autoComplete="email"
              className="h-10 bg-white"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>
          <label className="block space-y-1.5 text-sm font-medium text-[#272a28]">
            Password
            <Input
              autoComplete={isSignup ? "new-password" : "current-password"}
              className="h-10 bg-white"
              maxLength={128}
              minLength={12}
              name="password"
              placeholder={isSignup ? "At least 12 characters" : "Your password"}
              required
              type="password"
            />
          </label>
          {error && (
            <p aria-live="polite" className="text-sm font-medium text-rose-700" role="alert">
              {error}
            </p>
          )}
          <Button
            className="h-10 w-full bg-[#176f58] text-white hover:bg-[#125943]"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-stone-400">
          <span className="h-px flex-1 bg-[#e7e4dc]" />
          or continue with
          <span className="h-px flex-1 bg-[#e7e4dc]" />
        </div>
        <a
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#dedbd2] bg-white text-sm font-medium text-[#272a28] transition hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176f58]"
          href="/api/auth/google"
        >
          <svg aria-hidden="true" className="size-4" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.24l7.73 5.99c4.51-4.17 7.11-10.32 7.11-17.7Z" />
            <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.76l-7.73-5.99c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
          </svg>
          Continue with Google
        </a>

        <p className="mt-5 text-center text-sm text-stone-600">
          {isSignup ? "Already have an account?" : "New to Stronews?"}{" "}
          <Link
            className="font-semibold text-[#176f58] underline-offset-4 hover:underline"
            href={isSignup ? "/login" : "/signup"}
          >
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  );
}
