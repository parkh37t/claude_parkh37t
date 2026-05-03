# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static, dependency-free Korean-language cat-themed webpage ("🐾 고양이 천국 / Cat Paradise"). Three files only: `index.html`, `styles.css`, `script.js`. There is no build system, no package manager, and no test suite.

## Running locally

Open `index.html` directly in a browser, or serve the directory with any static server, e.g.:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. An internet connection is required because random cat images are fetched from `https://cataas.com` at runtime (see `<img>` tags in `index.html` and the `cataas.com/cat?...` URLs constructed in `script.js`).

## Architecture notes

- **No framework / no bundler.** `index.html` directly references `styles.css` and `script.js`. Any new dependency must either be vendored or loaded via CDN `<script>` / `<link>` — there is no `npm`/`package.json`.
- **DOM wiring lives in `script.js`.** Element lookups happen at the top of the file via `getElementById` against fixed IDs in `index.html` (`newCatBtn`, `randomCat`, `gallery`, `refreshGalleryBtn`, `meowBtn`, `meowText`). Renaming an ID requires updating both files.
- **Animation system is CSS-driven.** All motion (walking cat sprite, floating paws, hero float, fact-card hover, header bounce, gallery click-to-enlarge) is implemented with `@keyframes` in `styles.css`. The walking cat at the bottom of the page is built entirely from positioned `<div>`s in `index.html` (`.walking-cat` → `.cat-body` → head/ears/eyes/whiskers/torso/legs/tail), not an image asset. JS only triggers re-renders by toggling `style.animation` (see the `meowBtn` handler's `void meowText.offsetWidth` reflow trick).
- **Reduced-motion is honored.** `@media (prefers-reduced-motion: reduce)` in `styles.css` disables all animations and hides the decorative `.walking-cat` and `.floating-paws`. Preserve this when adding new animations.
- **Cat image refresh pattern.** New cat images are forced by appending `?random=${Date.now()}` (and an index for the gallery) to bypass cache. Reuse this pattern for any additional `cataas.com` calls.
- **Language.** All user-facing copy is Korean (`<html lang="ko">`). Match this when adding new UI text.
