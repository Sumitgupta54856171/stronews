"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "//embellishedcoffee.com/b.XDVNsFdrGflG0RYwWhc-/fe/mR9FupZPUVlSk/PqTWc/2jN/D/AExMNhz/M/tGN/z/Yu0nM/DgEf3vNMwl";

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
      className="my-5 flex w-full items-center justify-center text-center"
      data-ad-placement="below-main-news"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(ssxlt){var d=document,s=d.createElement('script'),l=d.currentScript||d.scripts[d.scripts.length-1];s.settings=ssxlt||{};s.src="\\/\\/embellishedcoffee.com\\/b.XDVNsFdrGflG0RYwWhc-\\/fe\\/mR9FupZPUVlSk\\/PqTWc\\/2jN\\/D\\/AExMNhz\\/M\\/tGN\\/z\\/Yu0nM\\/DgEf3vNMwl";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`,
        }}
      />
    </div>
  );
}
