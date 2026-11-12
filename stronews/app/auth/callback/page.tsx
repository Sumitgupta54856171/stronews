"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/lib/auth-client";
import { useToast } from "@/components/ui/toast-provider";

export default function AuthCallbackPage() {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.slice(1)).get("token");
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    if (!token) {
      router.replace("/login?error=google_failed");
      return;
    }

    setAuthToken(token);
    toast.success("You’re signed in with Google.");
    router.replace("/");
  }, [router, toast]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 text-sm text-stone-600">
      Completing sign-in…
    </main>
  );
}
