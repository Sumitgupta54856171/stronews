"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function FixedAadsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Sponsored advertisement"
      className="fixed inset-x-0 bottom-0 z-40 px-0 pt-1 sm:px-1"
    >
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-t-lg border border-[#dedbd2] bg-[#f7f6f2]/95 shadow-[0_-4px_16px_rgba(23,25,24,0.1)] backdrop-blur-md">
        <div className="flex h-5 items-center justify-between border-b border-[#e7e4dc] px-2 sm:px-3">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600">
            <span className="size-1.5 rounded-full bg-emerald-700" aria-hidden="true" />
            Sponsored
          </span>
          <div className="flex items-center gap-2">
            <a
              href="https://aads.com/campaigns/new?source_id=2462533&source_type=ad_unit&partner=2462533"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium text-stone-500 underline decoration-stone-300 underline-offset-2 transition hover:text-emerald-800"
            >
              Advertise here
            </a>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Close advertisement"
              className="inline-flex size-6 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-200 hover:text-stone-900"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center py-1">
          <iframe
            title="A-Ads adaptive sponsored banner"
            data-aa="2462533"
            src="https://acceptable.a-ads.com/2462533/?size=Adaptive"
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
            }}
          />
        </div>
      </div>
    </aside>
  );
}
