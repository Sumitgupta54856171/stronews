"use client";

import { useEffect, useRef } from "react";

const HILLTOP_IN_FEED_SRC =
  "//embellishedcoffee.com/bHXOV/s/d.GSlq0qYkWHcf/ze_mn9FubZ/UQlwkoPyTgcH2/NJDcAR1FN/zocTtUNqz-Y/0XMjDbUF4lMGQf";

export default function HilltopInFeedAd({ id }: { id?: string | number }) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = adRef.current;
    if (!el) return;

    // Avoid duplicate script insertion in the same ad container
    if (el.querySelector(`script[src*="embellishedcoffee.com"]`)) return;

    const s = document.createElement("script");
    s.src = HILLTOP_IN_FEED_SRC;
    s.async = true;
    s.referrerPolicy = "no-referrer-when-downgrade";
    s.setAttribute("data-cfasync", "false");
    el.appendChild(s);

    return () => {
      s.remove();
    };
  }, []);

  return (
    <div
      ref={adRef}
      className="my-3 flex w-full items-center justify-center overflow-hidden py-1"
      data-ad-placement={`hilltop-infeed-${id}`}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(qne){var d=document,s=d.createElement('script'),l=d.currentScript||d.scripts[d.scripts.length-1];s.settings=qne||{};s.src="\\/\\/embellishedcoffee.com\\/bHXOV\\/s\\/d.GSlq0qYkWHcf\\/ze_mn9FubZ\\/UQlwkoPyTgcH2\\/NJDcAR1FN\\/zocTtUNqz-Y\\/0XMjDbUF4lMGQf";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';s.setAttribute('data-cfasync','false');l.parentNode.insertBefore(s,l);})({})`,
        }}
      />
    </div>
  );
}
