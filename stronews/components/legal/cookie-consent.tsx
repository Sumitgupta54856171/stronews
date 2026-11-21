"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "stronews.cookie_consent_v1";
const CONSENT_EVENT = "stronews:cookie-consent-changed";

type ConsentState = {
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
};

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) {
        // Delay slightly for smooth entrance without layout jump
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  function saveConsent(state: ConsentState) {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
    setIsOpen(false);
  }

  function handleAcceptAll() {
    saveConsent({
      functional: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    });
  }

  function handleRejectNonEssential() {
    saveConsent({
      functional: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    });
  }

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      role="region"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-300 sm:bottom-6 sm:left-6 sm:right-6"
    >
      <div className="rounded-2xl border border-[#dedbd2] bg-white/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-800">
              <ShieldCheck className="size-5" />
            </span>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-[#171918]">
                Your Privacy & Cookie Choices
              </h2>
              <p className="text-xs leading-relaxed text-stone-600 sm:max-w-2xl">
                We and our trusted partners may use cookies, identifiers, and device data to deliver
                our digital news service, measure audience engagement, and serve advertising. Learn
                how we handle your data in our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-950"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:pt-0">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRejectNonEssential}
              className="h-8 rounded-lg border-[#dedbd2] px-3.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
            >
              Essential Only
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="h-8 rounded-lg bg-[#176f58] px-4 text-xs font-medium text-white hover:bg-[#125943]"
            >
              Accept All
            </Button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              aria-label="Close cookie consent"
              className="ml-1 inline-flex size-7 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 sm:hidden"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
