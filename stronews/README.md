This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5003](http://localhost:5003) with your browser to see the result.

### Production deployment

For the public domain, build into a separate release directory while the current server keeps serving:

```bash
npm run build:production
```

Do not use `npm run build` while the production server is running: the default Next.js build writes to `.next`, which is also the live server's build directory. The isolated production build avoids changing files currently in use.

On the Stronews host, activate the completed build by restarting the managed app service:

```bash
systemctl --user stop stronews-app.service
npm run activate:production
systemctl --user start stronews-app.service
```

`build:production` does not modify the live `.next` directory while pages are being served. It also retains static chunks from the previous build, so pages already open in readers' browsers keep working after a deployment instead of producing 404 errors for old hashed chunk URLs.

The `stronews-app.service` owns port 5003. Do not run `npm run start` while that service is active; use `systemctl --user restart stronews-app.service` to restart the current production build.

### Cloudflare Tunnel

The Next.js server listens on port 5003 in development and production. In Cloudflare Zero Trust, open the `carecircle-live` tunnel's public hostname for `stronews.carecircle-ai.xyz` and set its service to `http://localhost:5003` (or `http://127.0.0.1:5003` on the same host). Save the hostname route and restart the connector if required. Keep the Cloudflare Tunnel service enabled, and make sure only connectors serving this same application build are connected.

On the Stronews host, `deploy/systemd/stronews-cloudflared.service` is the user-level systemd service for the `stronews-5003` tunnel. It runs the connector automatically while the `vscode` user systemd session is active and restarts it after failures. For automatic startup before any user logs in and persistence after logout, the host administrator must enable lingering for `vscode`; that host-level permission cannot be granted by the project itself.

The browser console message `static.cloudflareinsights.com/beacon.min.js ... ERR_BLOCKED_BY_CLIENT` is from a browser extension/content blocker blocking Cloudflare's analytics beacon; it does not prevent the site or its Next.js chunks from loading.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Reader rewards

Signed-in readers earn coins once per story after three active minutes with the story visible, a correct answer to every section quiz, and a successful final game verification challenge. An incorrectly answered quiz can be retried. The game challenge requires matching 10 pairs and can also be retried. Publishers must add one four-option quiz to each section when uploading a story. Technology, AI, finance, and business stories earn 3 coins; all other stories earn 2 coins. The `/rewards` page shows the balance and recent claims. The `/spin` page provides one server-verified spin per UTC day for a random 1–8 coins; partner links on that page are optional and only open when clicked. Spin rewards are included in the coin balance. Publishers can set a story's reward topic when uploading, or leave it on auto-detect.

Category feeds have separate routes: `/tech`, `/finance`, `/india`, `/sports`, and `/entertainment`. These routes organize category content and are included in the sitemap; category URLs alone do not guarantee advertising rates or revenue.

## Accounts

Set `MONGODB_URI`, `AUTH_SECRET`, `AUTH_URL`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` in `.env`. Generate a secret with `openssl rand -base64 32`; keep it private and do not commit `.env`. The secret must be at least 32 bytes. Set up a Google OAuth web client and add `${AUTH_URL}/api/auth/google/callback` as an authorized redirect URI. For local development, use `http://localhost:5003` as `AUTH_URL`.

Create an account at `/signup` or sign in at `/login` using email/password or Google. Accounts are stored in MongoDB, passwords are hashed with scrypt, and authentication uses an HS256 JWT that expires after seven days. The client stores the JWT and sends it to protected endpoints in the `Authorization: Bearer <token>` header. Google sign-in requires a verified email. For safety, Google accounts are not automatically linked to existing password accounts with the same email.

Signed-in users can save stories to their account. Saved stories are stored in MongoDB with a unique user/story pair, so each account sees and manages only its own saved list.

Story publishing is restricted to the `stronews@proton.me` account. The upload link is hidden from other accounts, and the news API checks the authenticated account email before accepting uploads.

Visit `/games` for fourteen lightweight browser games covering Puzzle, Cricket & Sports, Word, Board, Arcade, Brain Training, Racing, Strategy, and Multiplayer categories. The games avoid real-money, betting, and cash prizes. Article coin claims use a separate matching-pairs verification challenge after the reading and quiz requirements are met.

## Search visibility

The site publishes `/robots.txt` and a dynamic `/sitemap.xml` containing public pages and available news stories. Article pages render their story content on the server and include canonical URLs, social-sharing metadata, and NewsArticle structured data. After deploying, add `https://stronews.carecircle-ai.xyz` as a property in Google Search Console or Bing Webmaster Tools and submit `https://stronews.carecircle-ai.xyz/sitemap.xml`; indexing and ranking are controlled by the search engines and are not immediate.
