"use client";

import { useEffect } from "react";

const POPUNDER_SCRIPT_URL =
  "https://delicious-order.com/bg3.VE0KPG3HpJv/b/m-VoJfZNDp0J3/Nrj/Q/w/MNjmgb5fLhT/cO2gNVDfAbykOeTcMb";

export default function HomePopunderAd() {
  useEffect(() => {
    let script: HTMLScriptElement | undefined;
    const frameId = window.requestAnimationFrame(() => {
      script = document.createElement("script");
      script.src = POPUNDER_SCRIPT_URL;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.body.appendChild(script);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      script?.remove();
    };
  }, []);

  return null;
}
