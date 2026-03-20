# Bug History

This file records all identified and resolved bugs. Read this at the start of each session to avoid repeating known mistakes.
Append a new entry immediately after every bug fix — no matter how small.

---

### [2026-03-20 00:00] Bug: Mobile menu not working on any page
- **Error**: Hamburger button tap had no effect on all 4 pages on mobile devices.
- **Root Cause**: Three compounding issues: (1) `menu.js` was never loaded via `<script>` tag in any HTML file. (2) The mobile menu overlay element (`id="mobile-menu"`) did not exist in any page's HTML. (3) Hamburger buttons on `about.html` and `works.html` had no `id="mobile-menu-open"`, and `contact.html` had no hamburger button at all.
- **File(s) Modified**: `index.html`, `about.html`, `works.html`, `contact.html`
- **Fix Summary**: Added mobile menu overlay HTML + close button to all 4 pages. Added `id="mobile-menu-open"` to hamburger buttons in `about.html` and `works.html`. Added hamburger button to `contact.html`. Added `<script src="./menu.js"></script>` before `</body>` on all 4 pages. Also fixed all nav link hrefs from `./filename.html` to root-relative paths (`/`, `/about`, `/works`, `/contact`).
- **Prevention Note**: See rules.md §9 — always run the Navigation Menu Check before closing any task that touches pages with navigation.

### [2026-03-20 01:00] Bug: Mobile menu still not opening after initial fix (Tailwind CDN + classList)
- **Error**: Hamburger button tap still had no visible effect on mobile after menu.js and overlay HTML were added.
- **Root Cause**: `menu.js` used `classList.remove('translate-x-full')` to show the overlay. Tailwind Play CDN generates CSS by scanning the DOM at load time — it does NOT react to runtime `classList` changes. Removing the class does not remove the CDN-generated style reliably, especially on mobile. The overlay remained off-screen.
- **File(s) Modified**: `menu.js`, `index.html`, `about.html`, `works.html`, `contact.html`
- **Fix Summary**: Rewrote `menu.js` to use `element.style.transform` directly instead of Tailwind class toggling. Changed overlay HTML from `class="... translate-x-full"` + external transition to `style="z-index:200; transform: translateX(100%); transition: transform 0.3s ease;"` so initial state and all JS transitions are purely inline-style-driven, independent of Tailwind CDN.
- **Prevention Note**: On any project using Tailwind Play CDN, NEVER use Tailwind classes for JS-toggled CSS properties. Always use inline styles (`element.style.X = value`). See rules.md §9-A for the canonical rule.

### [2026-03-20 18:30] Bug: Internal navigation links missing .html extension
- **Error**: Navigating to sections from any page resulted in 404 or broken paths because the `.html` extension was missing.
- **Root Cause**: All internal links were previously erroneously changed to root-relative paths without extensions (e.g., `/about` instead of `about.html`), which doesn't work for this static file structure on local dev or standard static hosting.
- **File(s) Modified**: `index.html`, `about.html`, `works.html`, `contact.html`
- **Fix Summary**: Reverted all internal links in both desktop and mobile navigation to include the `.html` extension and use relative paths (e.g., `about.html`).
- **Prevention Note**: Always use the full file extension for internal links in pure static HTML projects to ensure compatibility across all environments.

### [2026-03-20 02:00] Bug: Mobile menu broken in DevTools emulation on works.html and contact.html
- **Error**: Hamburger button tap had no effect specifically in DevTools mobile emulation (iPhone/Android view). Desktop narrow-window resize worked fine. Only works.html and contact.html were affected; index.html and about.html worked correctly.
- **Root Cause**: `overflow-x: hidden` was set on `<body>` in works.html and contact.html (not on index.html/about.html). In mobile browsers and DevTools mobile emulation, `body { overflow: hidden }` creates a new scroll container. `position: fixed` elements (including the hamburger button in the nav) have their hit-test regions calculated against this body container instead of the viewport, causing taps to miss the button's actual click area. Secondary issue: menu.js used only `click` event with no `touchstart` fallback.
- **File(s) Modified**: `works.html`, `contact.html`, `menu.js`
- **Fix Summary**: Moved `overflow-x-hidden` from `<body>` to `<html>` in works.html and contact.html. Added `touchstart` handler (with `e.preventDefault()` to prevent ghost clicks) alongside existing `click` handler in menu.js via `addTapHandler()` helper.
- **Prevention Note**: NEVER put `overflow: hidden` or `overflow-x: hidden` on `<body>`. Always put it on `<html>` instead. `body { overflow: hidden }` breaks `position: fixed` hit-testing in mobile browsers and DevTools emulation. See updated rules.md §9.

### [2026-03-20 03:00] Bug: GitHub Actions deployment failing — pnpm not found / API token auth error
- **Error**: (1) `Unable to locate executable file: pnpm` — wrangler-action tried to use pnpm which wasn't in the CI environment. (2) `Authentication error [code: 10000]` — token was a Global API Key, not an API Token.
- **Root Cause**: Two separate issues: wrangler-action@v3 defaults to pnpm on Node.js environments where pnpm is absent; and the GitHub Secret `CLOUDFLARE_API_TOKEN` was never set (was empty), then set with a Global API Key instead of a scoped API Token.
- **File(s) Modified**: `.github/workflows/deploy.yml`, GitHub Actions Secrets
- **Fix Summary**: Added `packageManager: npm` and explicit `env:` block to workflow. Set `CLOUDFLARE_ACCOUNT_ID` secret. Replaced Global API Key with a proper Cloudflare API Token (created via API Tokens → Edit Cloudflare Pages template).
- **Prevention Note**: `CLOUDFLARE_API_TOKEN` must be a **scoped API Token** from https://dash.cloudflare.com/profile/api-tokens (use "Edit Cloudflare Pages" template). Global API Keys do NOT work with wrangler. Always verify secrets are non-empty in the Actions log (`***` means set, blank means missing).

### [2026-03-20 04:00] Bug: wrangler deploy creates preview deployments instead of updating production URL
- **Error**: Each `wrangler pages deploy . --project-name=X` created a unique hash URL (e.g. `a090147d.demo-static-mirai-foundry.pages.dev`) without updating the canonical production URL `demo-static-mirai-foundry.pages.dev`.
- **Root Cause**: The `--branch` flag was missing from the deploy command. Without `--branch=main`, wrangler has no way to associate the deployment with the production branch, so Cloudflare Pages treats it as an unassociated preview deployment.
- **File(s) Modified**: `.github/workflows/deploy.yml`
- **Fix Summary**: Added `--branch=main` to the wrangler pages deploy command. Now all deploys from GitHub Actions update `https://demo-static-mirai-foundry.pages.dev` directly.
- **Prevention Note**: The deploy command MUST be `pages deploy . --project-name=<name> --branch=main`. Without `--branch=main`, every deploy generates a new random URL. See rules.md §5-A.

### [2026-03-21 06:40] Bug: Mobile menu / Fixed nav width pushed off-screen despite w-full
- **Error**: Nav menu (hamburger) not visible on `works.html` and `contact.html` in Chrome DevTools mobile emulation (iPhone SE).
- **Root Cause**: Browser "scroll delegation" rules. If only `html` has `overflow-x: hidden`, the browser may delegate scroll control to `body`. If an internal element (like a `12vw` header) overflows, the `body`'s scrollable width expands beyond the viewport, causing `fixed` elements with `w-full` to track the expanded scroll width rather than the viewport width.
- **File(s) Modified**: `index.html`, `works.html`, `contact.html`
- **Fix Summary**: Added `overflow-x-hidden` to **both** `<html>` and `<body>` tags. This "locks" the scrollable width to the viewport on both levels, forcing `fixed` elements to correctly respect the 100% viewport width.
- **Prevention Note**: Always pair `html { overflow-x: hidden }` with `body { overflow-x: hidden }` for projects with large typography or `fixed` navbars to ensure consistent mobile layout.
