"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "//embellishedcoffee.com/b/XjVnsxd.G-l-0VYDWNc_/YeQm/9nu/ZGUjlZkZPsTFcT2/NcDiATxWNgzhM/tQNnzHYC0jM/DQE/3ANpwA";

export default function EmbellishedAdSlot() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if script is already injected
    if (container.querySelector(`script[src*="embellishedcoffee.com"]`)) return;

    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.referrerPolicy = "no-referrer-when-downgrade";

    container.appendChild(s);

    return () => {
      s.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-6 flex min-h-[90px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-[#e5e2d9] bg-[#faf9f6] p-3 text-center shadow-xs"
      aria-label="Sponsored advertisement"
    >
      <div className="mb-2 flex w-full items-center justify-between px-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
          <span
            className="size-1.5 rounded-full bg-emerald-600"
            aria-hidden="true"
          />
          Sponsored
        </span>
        <span className="text-[10px] text-stone-400">Partner content</span>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(hhwe){var d=document,s=d.createElement('script'),l=d.currentScript||d.scripts[d.scripts.length-1];s.settings=hhwe||{};s.src="\\/\\/embellishedcoffee.com\\/b\\/XjVnsxd.G-l-0VYDWNc_\\/YeQm\\/9nu\\/ZGUjlZkZPsTFcT2\\/NcDiATxWNgzhM\\/tQNnzHYC0jM\\/DQE\\/3ANpwA";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`,
        }}
      />
    </div>
  );
}
