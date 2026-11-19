"use client";

import { useEffect, useRef } from "react";

type AdsterraBannerProps = {
  adKey: string;
  width?: number;
  height?: number;
  domain?: string;
  className?: string;
};

export default function AdsterraBanner({
  adKey,
  width = 300,
  height = 250,
  domain = "www.highperformanceformat.com",
  className = "",
}: AdsterraBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = bannerRef.current;
    if (!container) return;

    // React StrictMode double-render cleanup
    container.innerHTML = "";

    // 1. Global atOptions script configuration
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.setAttribute("data-cfasync", "false");
    configScript.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    // 2. Invoke script from Adsterra network
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `https://${domain}/${adKey}/invoke.js`;
    invokeScript.async = true;
    invokeScript.setAttribute("data-cfasync", "false");

    container.appendChild(configScript);
    container.appendChild(invokeScript);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [adKey, width, height, domain]);

  return (
    <div
      className={`my-4 flex items-center justify-center overflow-hidden ${className}`}
      data-ad-placement="adsterra-banner"
    >
      <div ref={bannerRef} style={{ minWidth: width, minHeight: height }} />
    </div>
  );
}
