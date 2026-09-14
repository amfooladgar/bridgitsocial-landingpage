// Minimal GA4 loader (gtag.js), gated on a real Measurement ID being set in
// analytics-config.js. Include analytics-config.js BEFORE this file on every page.
//
// GA4's own gtag.js automatically reads utm_source/utm_medium/utm_campaign/utm_term/
// utm_content/utm_id off the landing URL and attaches them as session-scope traffic-source
// dimensions on the first pageview/session_start event — no extra code needed here to
// capture the marketing agent's tracked-link params (marketing/agent's ADR-0014 /
// SPEC.md §15 #14). This file only has to get the base gtag.js tag installed correctly.
(function () {
  var id = window.BRIDGIT_GA_MEASUREMENT_ID;
  if (!id) return; // not configured yet — intentionally a no-op, never a broken tag

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);
})();
