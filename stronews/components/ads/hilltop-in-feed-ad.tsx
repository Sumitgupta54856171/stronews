"use client";

import { useEffect, useRef } from "react";

const HILLTOP_MOBILE_IN_FEED_SRC =
  "//embellishedcoffee.com/bHXOV/s/d.GSlq0qYkWHcf/ze_mn9FubZ/UQlwkoPyTgcH2/NJDcAR1FN/zocTtUNqz-Y/0XMjDbUF4lMGQf";
const HILLTOP_DESKTOP_IN_FEED_SRC =
  "//embellishedcoffee.com/bFXCVHs.dRGslm0nYOWVcl/NermW9zuvZDUDlqkBPSTDcE2uNmD_EI0nMJTncCtVNgzUY/0mMiTHQVy_MpQV";

export default function HilltopInFeedAd({ id }: { id?: string | number }) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = adRef.current;
    if (!el) return;

    const loadDesktopAd = window.matchMedia("(min-width: 768px)").matches;
    const src = loadDesktopAd
      ? HILLTOP_DESKTOP_IN_FEED_SRC
      : HILLTOP_MOBILE_IN_FEED_SRC;
    const existingScript = el.querySelector<HTMLScriptElement>(
      `script[src*="embellishedcoffee.com"]`,
    );

    if (existingScript?.src.includes(src.replace(/^\/\//, "https://"))) return;
    existingScript?.remove();

    const script = document.createElement("script");
    Object.assign(script, { settings: {} });
    script.src = src;
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";
    script.setAttribute("data-cfasync", "false");
    script.onerror = () => {
      console.error("HilltopAds in-feed script failed to load.", script.src);
    };
    el.appendChild(script);

    const media = window.matchMedia("(min-width: 768px)");
    const onViewportChange = () => {
      const currentSrc = media.matches
        ? HILLTOP_DESKTOP_IN_FEED_SRC
        : HILLTOP_MOBILE_IN_FEED_SRC;
      const currentScript = el.querySelector<HTMLScriptElement>(
        `script[src*="embellishedcoffee.com"]`,
      );
      if (
        currentScript &&
        currentScript.src.includes(currentSrc.replace(/^\/\//, "https://"))
      ) {
        return;
      }
      currentScript?.remove();
      const nextScript = document.createElement("script");
      Object.assign(nextScript, { settings: {} });
      nextScript.src = currentSrc;
      nextScript.async = true;
      nextScript.referrerPolicy = "no-referrer-when-downgrade";
      nextScript.setAttribute("data-cfasync", "false");
      el.appendChild(nextScript);
    };

    media.addEventListener("change", onViewportChange);
    return () => media.removeEventListener("change", onViewportChange);
  }, []);

  return (
    <div
      ref={adRef}
      className="my-3 flex w-full items-center justify-center overflow-hidden py-1"
      data-ad-placement={`hilltop-infeed-${id}`}
    />
  );
}
