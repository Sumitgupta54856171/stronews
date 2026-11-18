"use client";

import { useEffect, useRef, useState } from "react";

const SCRIPT_URL =
  "https://bauval.org/21/f371d71a591b4c696d10fc4460bd4ac2";
const CONTAINER_ID = "container-f371d71a591b4c696d10fc4460bd4ac2";
const FALLBACK_AADS_ID = "2462533";

export default function NativeBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    const container =
      containerRef.current || document.getElementById(CONTAINER_ID);
    if (!container) return;

    // Check if script has already been injected to avoid duplication
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    script.onerror = () => {
      // If blocked by adblocker or network restriction
      setAdBlocked(true);
    };

    container.parentElement?.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <aside
      aria-label="Sponsored content"
      className="mx-auto my-5 w-full max-w-[1320px] px-4 sm:px-7"
    >
      <div className="overflow-hidden rounded-lg border border-[#e5e2d9] bg-[#faf9f6] px-3 py-2.5 shadow-xs">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            <span
              className="size-1.5 rounded-full bg-emerald-600"
              aria-hidden="true"
            />
            Sponsored
          </span>
          <span className="text-[10px] font-medium text-stone-400">
            Partner content
          </span>
        </div>

        {/* Required Adsterra / Bauval Native Banner Container */}
        <div className="flex w-full items-center justify-center min-h-[90px]">
          <div
            id={CONTAINER_ID}
            ref={containerRef}
            className="w-full text-center"
          />
        </div>

        {/* Live Fallback: Shown if the external native script is blocked by an ad-blocker */}
        {adBlocked && (
          <div className="mt-2 flex w-full items-center justify-center">
            <iframe
              title="A-Ads sponsored banner"
              data-aa={FALLBACK_AADS_ID}
              src={`https://acceptable.a-ads.com/${FALLBACK_AADS_ID}/?size=Adaptive`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{
                border: 0,
                padding: 0,
                width: "100%",
                maxWidth: "728px",
                height: "90px",
                minHeight: "90px",
                overflow: "hidden",
                display: "block",
                margin: "0 auto",
                backgroundColor: "transparent",
              }}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
