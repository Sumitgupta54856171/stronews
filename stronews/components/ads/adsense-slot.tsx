"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/site-config";

type AdFormat = "horizontal" | "rectangle" | "in-article" | "auto";

type AdSenseSlotProps = {
  slotId?: string;
  format?: AdFormat;
  className?: string;
};

export default function AdSenseSlot({
  slotId = "1234567890",
  format = "horizontal",
  className = "",
}: AdSenseSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || pushedRef.current) return;
    try {
      // Type declaration for window.adsbygoogle
      const win = window as unknown as { adsbygoogle?: unknown[] };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // Ignore adsbygoogle push error if AdSense script is blocked or still loading
    }
  }, []);

  const formatStyles: Record<AdFormat, string> = {
    horizontal: "min-h-[90px] max-w-[728px]",
    rectangle: "min-h-[250px] max-w-[336px]",
    "in-article": "min-h-[120px] w-full",
    auto: "min-h-[100px] w-full",
  };

  return (
    <div
      className={`mx-auto my-6 flex flex-col items-center justify-center overflow-hidden rounded-lg border border-[#e5e2d9] bg-[#faf9f6] p-3 text-center ${formatStyles[format]} ${className}`}
      aria-label="Advertisement container"
    >
      <span className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-stone-400">
        Advertisement
      </span>

      <div className="flex w-full flex-1 items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format === "in-article" ? "fluid" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
