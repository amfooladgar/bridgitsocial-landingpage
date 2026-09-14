# Analytics Setup (GA4)

This guide covers creating a Google Analytics 4 property for bridgitsocial.com and wiring
its Measurement ID into the site.

## Table of Contents

- [Why](#why)
- [Create the GA4 property](#create-the-ga4-property)
- [Configure the site](#configure-the-site)
- [Verify](#verify)
- [How it works](#how-it-works)

## Why

The Bridgit marketing agent (a separate project, `marketing/agent/` in the main
BridgitSocial repo) tags outbound links from LinkedIn/Instagram posts with UTM parameters
(`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) so a campaign's real-world
reach can be measured. Before this, those tags had nowhere to land — this site had no
analytics at all, so a tagged link would work (a human clicking it sees the real page) but
the tag itself was silently dropped, nowhere read or recorded.

GA4's own `gtag.js` snippet automatically parses `utm_*` query parameters off the landing
URL and attaches them as session-scope traffic-source dimensions on the first pageview — no
custom code needed beyond installing the tag correctly on every page, which is what this
setup does.

## Create the GA4 property

Verified against Google's current Analytics Help docs (2026-09-14) — the account/property/
stream hierarchy is core to GA4 and stable, but double-check exact button labels if the UI
has moved by the time you do this.

1. Go to <https://analytics.google.com> and sign in with the Google account that should own
   this data (ideally a shared team account, not a personal one).
2. If you don't have an Analytics **account** yet: click **Start Measuring** (first-time) or
   **Admin → Create → Account**. Name it (e.g. "Bridgit Social"), set data-sharing
   preferences, click **Next**.
3. Create a **property**: name it (e.g. "bridgitsocial.com"), set the reporting timezone
   and currency, click through the industry/business-size/use-case prompts, then **Create**
   and accept the Terms of Service.
4. Add a **Web** data stream: click **Add stream → Web**, enter `https://www.bridgitsocial.com`
   as the URL and a stream name, optionally leave "Enhanced measurement" on (it adds
   automatic scroll/outbound-click/file-download tracking — not required for UTM capture,
   but free once the base tag is installed), then **Create stream**.
5. Get the **Measurement ID**: in the stream's details panel (or **Admin → Data Streams →
   your stream**), copy the ID starting with `G-` (e.g. `G-ABC1234XYZ`). This is the only
   value you need to give this codebase — it's not a secret (it's visible in every page's
   network traffic by design), just paste it directly.

## Configure the site

Open `assets/js/analytics-config.js` and set the ID:

```js
window.BRIDGIT_GA_MEASUREMENT_ID = "G-ABC1234XYZ"; // your real ID
```

That's the only change needed. Every page already includes
`assets/js/analytics-config.js` then `assets/js/analytics.js` in its `<head>`
(`assets/js/analytics.js` is the loader — it no-ops entirely until a real ID is set here,
so it's always safe to leave the placeholder empty in a branch that isn't ready to ship
tracking yet).

## Verify

1. `npm run build && npm run preview`, open the preview URL with a UTM-tagged query string,
   e.g. `?utm_source=linkedin&utm_medium=organic&utm_campaign=test`.
2. Open browser dev tools → Network tab → confirm a request to
   `googletagmanager.com/gtag/js?id=G-...` fires.
3. In GA4, **Admin → DebugView** (or **Reports → Realtime**) should show the session within
   a few seconds, with the UTM values visible under the session's traffic-source detail.
4. Don't rely on the `npm run deploy` / `dist/` pipeline to confirm real production
   behavior. Found while wiring this up (2026-09-14): `npm run build` doesn't currently
   copy `assets/js/*.js` into `dist/` at all (classic `<script src>` tags aren't part of
   Vite's module graph and there's no `public/` dir to fall back to — this predates and is
   unrelated to the analytics change, it affects the existing jQuery/animation scripts
   too), and there is no `gh-pages` branch on the GitHub repo for `npm run deploy` to have
   ever pushed to. The live site's HTML matches the `main` branch's latest commit
   byte-for-byte, which strongly suggests GitHub Pages is actually configured to serve
   `main` directly, not `docs/DEPLOYMENT.md`'s documented `dist/`-via-`gh-pages` flow. Get
   this confirmed/reconciled before trusting either doc.

## How it works

- `assets/js/analytics-config.js` — a plain static file (not a Vite/env-injected value;
  see the repo-root note on why) holding the one setting, `BRIDGIT_GA_MEASUREMENT_ID`.
- `assets/js/analytics.js` — reads that global; if empty, does nothing. If set, injects the
  standard `gtag.js` script tag and initializes it (`gtag('config', id)`).
- Both scripts are included, in that order, in the `<head>` of every real page: `index.html`,
  `instructions.html`, `waitListPage.html`, `support/support.html`,
  `PrivacyPolicy/*.html`, `blog/index.html`, and every blog post (the template in
  `scripts/build-blog.js` includes them, so future posts get them automatically; the two
  posts not driven by that template, `bridgit-social-new-update.html` and
  `response-to-introducing-overtone.html`, were updated directly).
- No UTM-parsing code exists here on purpose — GA4's own `gtag.js` already does this
  automatically. Adding custom parsing would be redundant and a second thing to keep in
  sync with GA's own behavior.
