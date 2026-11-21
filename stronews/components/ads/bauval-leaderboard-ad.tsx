"use client";

import { useEffect, useRef } from "react";

const BAUVAL_AD_KEY = "764ed81d48208974cadfc9ab453bd25a";

export default function BauvalLeaderboardAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = adRef.current;
    if (!container) return;

    container.innerHTML = "";

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.setAttribute("data-cfasync", "false");
    configScript.innerHTML = `
      atOptions = {
        'key': '${BAUVAL_AD_KEY}',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `https://bauval.org/22/${BAUVAL_AD_KEY}`;
    invokeScript.async = true;
    invokeScript.setAttribute("data-cfasync", "false");

    container.appendChild(configScript);
    container.appendChild(invokeScript);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      className="my-3 hidden w-full items-center justify-center overflow-hidden md:flex"
      data-ad-placement="bauval-leaderboard"
      aria-label="Advertisement"
    >
      <div ref={adRef} className="h-[90px] w-[728px] max-w-full text-center" />
    </div>
  );
}
