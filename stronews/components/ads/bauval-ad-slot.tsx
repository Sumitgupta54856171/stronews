"use client";

import { useEffect, useRef, useState } from "react";

const BAUVAL_SCRIPT_URL =
  "https://bauval.org/14/7c09c7198cd3cb48705e9c7af8a62a50";
const AADS_UNIT_ID = "2462533";

export default function BauvalAdSlot() {
  const slotRef = useRef<HTMLDivElement>(null);
  const [bauvalLoaded, setBauvalLoaded] = useState(false);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    // Avoid duplicate script insertion
    if (slot.querySelector(`script[src="${BAUVAL_SCRIPT_URL}"]`)) return;

    let isMounted = true;
    const script = document.createElement("script");
    script.src = BAUVAL_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    script.onload = () => {
      // If Bauval successfully loads and renders content, mark as loaded
      window.setTimeout(() => {
        if (!isMounted) return;
        const hasAdNodes =
          slot.querySelector("iframe, img, a") || slot.clientHeight > 30;
        if (hasAdNodes) {
          setBauvalLoaded(true);
        }
      }, 500);
    };

    script.onerror = () => {
      // Bauval returned 403 or blocked by network/adblocker
      if (isMounted) {
        setBauvalLoaded(false);
      }
    };

    slot.appendChild(script);

    return () => {
      isMounted = false;
      script.remove();
    };
  }, []);

  return (
    <aside
      aria-label="Sponsored advertisement"
      className="mx-auto my-5 w-full max-w-[1320px] px-4 sm:px-7"
    >
      <div className="overflow-hidden rounded-lg border border-[#e5e2d9] bg-[#faf9f6] px-3 py-2.5 shadow-xs">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            <span className="size-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
            Sponsored
          </span>
          <a
            href={`https://aads.com/campaigns/new?source_id=${AADS_UNIT_ID}&source_type=ad_unit&partner=${AADS_UNIT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-medium text-stone-400 underline decoration-stone-300 underline-offset-2 transition hover:text-emerald-800"
          >
            Advertise here
          </a>
        </div>

        {/* Dedicated Bauval script anchor */}
        <div
          ref={slotRef}
          className={bauvalLoaded ? "flex items-center justify-center min-h-[90px]" : "hidden"}
        />

        {/* Live working ad banner (shown whenever Bauval is 403, inactive, or pending) */}
        {!bauvalLoaded && (
          <div className="flex w-full items-center justify-center py-0.5">
            <iframe
              title="A-Ads sponsored banner"
              data-aa={AADS_UNIT_ID}
              src={`https://acceptable.a-ads.com/${AADS_UNIT_ID}/?size=Adaptive`}
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
