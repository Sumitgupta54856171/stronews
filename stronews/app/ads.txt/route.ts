import { ADSENSE_CLIENT_ID } from "@/lib/site-config";

export function GET() {
  const publisherId = ADSENSE_CLIENT_ID.startsWith("ca-")
    ? ADSENSE_CLIENT_ID.slice(3)
    : ADSENSE_CLIENT_ID;

  const content = `# Google AdSense authorized digital seller verification
google.com, ${publisherId}, DIRECT, f08c47fec0942fa0
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
