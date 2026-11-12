"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UploadForm from "@/components/news/upload-form";
import { getAuthHeaders } from "@/lib/auth-client";
import { NEWS_PUBLISHER_EMAIL } from "@/lib/site-config";

type AccessState = "checking" | "allowed" | "denied" | "error";

export default function PublisherUpload() {
  const [access, setAccess] = useState<AccessState>("checking");

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { headers: getAuthHeaders(), cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401) return false;
        if (!response.ok) throw new Error("Could not verify publisher access.");
        const result: unknown = await response.json();
        if (
          typeof result !== "object" ||
          result === null ||
          !("user" in result) ||
          typeof result.user !== "object" ||
          result.user === null ||
          !("email" in result.user) ||
          typeof result.user.email !== "string"
        ) {
          throw new Error("Could not verify publisher access.");
        }
        return result.user.email.trim().toLowerCase() === NEWS_PUBLISHER_EMAIL;
      })
      .then((isPublisher) => {
        if (active) setAccess(isPublisher ? "allowed" : "denied");
      })
      .catch(() => {
        if (active) setAccess("error");
      });

    return () => {
      active = false;
    };
  }, []);

  if (access === "allowed") return <UploadForm />;

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="font-editorial text-3xl">
        {access === "checking"
          ? "Checking publisher access…"
          : access === "error"
            ? "Publisher access couldn’t be verified"
            : "Publisher access only"}
      </h1>
      {access !== "checking" && (
        <>
          <p className="mt-3 max-w-md text-sm text-stone-600">
            {access === "denied"
              ? "Only the authorized Stronews publisher account can upload stories."
              : "Please try again, or return to the news feed."}
          </p>
          <Link href="/" className="mt-5 text-sm font-medium text-emerald-800 underline">
            Return to the news feed
          </Link>
        </>
      )}
    </main>
  );
}
