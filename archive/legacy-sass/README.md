# Legacy Sass source (archived, unused)

This directory holds the original Sass source that the site's CSS was
presumably compiled from at some point in the past. It is **not** part of
the current build.

## Why it's here and not deleted

- `vite.config.js` does not reference these files anywhere (no `sass`
  preprocessor input, no import of `main.scss`).
- The `sass` npm package is not installed (`package.json` has no
  dependency on `sass` or `node-sass`), so Vite could not compile this
  even if something tried to.
- The real, shipped stylesheet is `assets/css/main.css` (plus
  `assets/css/noscript.css`), which is linked directly from the HTML pages
  and hand-edited in place. It has diverged significantly from this Sass
  source — it includes CSS custom properties, the mobile hamburger nav,
  and other styling that was never ported back here.

## What to do instead

- To change site styles, edit `assets/css/main.css` (or `noscript.css`)
  directly. There is no build/compile step for CSS in this project.
- Do not wire this folder back into the build without first reconciling
  it against the current `assets/css/main.css` — compiling it as-is would
  overwrite the live styles with an older, incomplete design.

Kept for reference only. Safe to delete once nobody needs to check the
site's earlier Sass-based structure.
