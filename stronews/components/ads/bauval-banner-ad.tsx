"use client";

const AD_KEY = "9f0280583e81a04906ba81a4f4df77a0";
const AD_SCRIPT_URL = `https://bauval.org/22/${AD_KEY}`;

export default function BauvalBannerAd() {
  const srcDocHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <base target="_blank"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 300px;
      height: 250px;
      overflow: hidden;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${AD_KEY}',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="${AD_SCRIPT_URL}"></script>
</body>
</html>`;

  return (
    <aside
      aria-label="Sponsored advertisement"
      className="mx-auto my-5 flex w-full max-w-[1320px] flex-col items-center justify-center px-4 sm:px-7"
    >
      <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg border border-[#e5e2d9] bg-[#faf9f6] p-3 shadow-xs">
        <div className="mb-2 flex w-full max-w-[300px] items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            <span
              className="size-1.5 rounded-full bg-emerald-600"
              aria-hidden="true"
            />
            Sponsored
          </span>
          <span className="text-[10px] font-medium text-stone-400">
            300 × 250
          </span>
        </div>

        <div className="flex h-[250px] w-[300px] items-center justify-center overflow-hidden rounded bg-stone-100/60">
          <iframe
            title="Sponsored Banner"
            width={300}
            height={250}
            scrolling="no"
            srcDoc={srcDocHtml}
            style={{
              width: "300px",
              height: "250px",
              border: 0,
              padding: 0,
              margin: 0,
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </aside>
  );
}
