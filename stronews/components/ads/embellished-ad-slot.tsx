"use client";

import { useEffect, useRef } from "react";

const EMBELLISHED_SCRIPT_SRC =
  "//embellishedcoffee.com/b/XjVnsxd.G-l-0VYDWNc_/YeQm/9nu/ZGUjlZkZPsTFcT2/NcDiATxWNgzhM/tQNnzHYC0jM/DQE/3ANpwA";
const AADS_UNIT_ID = "2462533";

export default function EmbellishedAdSlot() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load and execute the background EmbellishedCoffee script
    if (!container.querySelector(`script[src*="embellishedcoffee.com"]`)) {
      const s = document.createElement("script");
      s.src = EMBELLISHED_SCRIPT_SRC;
      s.async = true;
      s.referrerPolicy = "no-referrer-when-downgrade";
      container.appendChild(s);
    }
  }, []);

  return (
    <aside
      aria-label="Sponsored advertisement"
      className="my-7 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-[#e5e2d9] bg-[#faf9f6] p-3 shadow-xs"
    >
      <div className="mb-2 flex w-full items-center justify-between px-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
          <span
            className="size-1.5 rounded-full bg-emerald-600"
            aria-hidden="true"
          />
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

      {/* Live visible display banner */}
      <div
        ref={containerRef}
        className="flex w-full items-center justify-center py-1"
      >
        <iframe
          title="Sponsored Advertisement Banner"
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
    </aside>
  );
}
