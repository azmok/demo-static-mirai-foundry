# Session Log

This file stores session summaries, key decisions, and ongoing context for AI agents working on this project.
Read this file at the START of every session before taking any action.

---

### [2026-03-20 Session 5] GitHub Actions CI/CD 修復・デプロイ成功
- **Learned/Decided**: GitHub Actions が全 run で failure していた。原因は2段階: (1) wrangler-action@v3 が pnpm を探すが CI 環境にない → `packageManager: npm` で解決。(2) `CLOUDFLARE_API_TOKEN` シークレットが未設定、その後 Global API Key を誤投入 → Cloudflare API Token（`cfut_` prefix、Edit Cloudflare Pages 権限）に差し替えで解決。
- **Preferences**: デプロイ確認は `gh run list --limit 1` で status=success を必ず確認すること。
- **Plan Impact**: GitHub Secrets は必ず設定済みか `gh secret list` で確認してから作業開始すること。`CLOUDFLARE_API_TOKEN` は Global API Key ではなく API Token（Edit Cloudflare Pages テンプレート）を使うこと。rules.md §5-B に追記済み。

---

### [2026-03-20 Session 4] Mobile Menu Visibility & Event Handling
- **Learned/Decided**: Standardized `viewport` meta tags in all HTML files. Found that Chrome's mobile emulation can be sensitive to meta tag syntax and attribute order. Added `touchstart` event support in `menu.js` (User change) to ensure compatibility with touch devices where `click` events might be delayed or blocked.
- **Preferences**: Azuma confirmed that the menu is now functional. Diagnostic scripts were used and then removed.
- **Plan Impact**: Future mobile features must include `touchstart` support and strict `viewport` meta tag compliance.

---

### [2026-03-20 Session 4] DevTools Mobile Emulation Fix (overflow-x on body)
- **Learned/Decided**: `overflow-x: hidden` on `<body>` breaks `position: fixed` hit-testing in mobile browsers and DevTools emulation. Only works.html and contact.html had this — index.html and about.html did not, which explained why only 2 of 4 pages were broken. Fixed by moving the class to `<html>` and adding `touchstart` fallback to menu.js.
- **Preferences**: Azuma tests on DevTools mobile emulation as the primary mobile check method.
- **Plan Impact**: The rule is now canonical: always use `overflow-x-hidden` on `<html>`, never on `<body>`. Added to bug-history.md.

---

### [2026-03-20 Session 2] Tailwind CDN classList Anti-Pattern Fix
- **Learned/Decided**: After the initial menu fix, the menu still didn't open on mobile. Root cause: Tailwind Play CDN generates CSS at load time by scanning the DOM — it does NOT respond to JS `classList` changes at runtime. `classList.remove('translate-x-full')` had no reliable visual effect. Fixed by rewriting `menu.js` to use `element.style.transform` directly, and setting the overlay's initial hidden state via inline `style` attribute rather than a Tailwind class.
- **Preferences**: Azuma wants bugs documented in both `bug-history.md` AND `sessions.md` immediately after fixing. Also wants `rules.md` updated so successor agents don't repeat the same mistake — even across different projects.
- **Plan Impact**: The rule is now canonical in `rules.md §9-A`: on any project using Tailwind Play CDN, NEVER use Tailwind classes for JS-toggled CSS. Always use inline styles. This applies project-wide and should be inherited by any new agent reading these files.

---

### [2026-03-20 Session 1] Mobile Menu & Nav Links Fix
- **Learned/Decided**: All 4 HTML pages were missing the mobile menu overlay HTML, the `<script src="./menu.js">` load tag, and proper hamburger button IDs. `contact.html` had no hamburger button at all. Nav links used `./filename.html` instead of root-relative paths (`/`, `/about`, `/works`, `/contact`).
- **Preferences**: Azuma wants navigation menu functionality verified end-to-end on every task. Added a mandatory Navigation Menu Check to `rules.md §9`. Bug recorded in `bug-history.md`.
- **Plan Impact**: Future tasks touching any HTML page must run the §9 checklist: overlay HTML present, button IDs correct, `menu.js` loaded, links use root-relative paths.

---

### [YYYY-MM-DD HH:mm] Initial Setup
- **Learned/Decided**: Project initialized as Next.js static export site, deployed to Cloudflare Pages.
- **Preferences**: pnpm only, no pip, Tailwind CSS for styling. Agent must follow surgical scope rules in rules.md.
- **Plan Impact**: All future tasks must respect `output: 'export'` constraints — no server-side APIs, no dynamic image optimization.
