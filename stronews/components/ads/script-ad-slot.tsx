"use client";

import { useEffect, useRef } from "react";

type ScriptAdSlotProps = {
  containerId?: string;
  scriptSrc: string;
  className?: string;
};

export default function ScriptAdSlot({
  containerId,
  scriptSrc,
  className = "",
}: ScriptAdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = adRef.current;
    if (!el) return;

    // Check if script is already loaded to avoid duplicates
    if (el.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute("data-cfasync", "false"); // Prevents Cloudflare Rocket Loader from blocking the ad script
    el.appendChild(script);

    return () => {
      script.remove();
    };
  }, [scriptSrc]);

  return (
    <div
      ref={adRef}
      className={`my-4 flex w-full flex-col items-center justify-center ${className}`}
      data-ad-placement="script-ad-slot"
    >
      {containerId && <div id={containerId} className="w-full text-center" />}
    </div>
  );
}
