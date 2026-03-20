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

<!-- No entries yet. Add entries in the format below as bugs are discovered and fixed. -->

<!--
### [YYYY-MM-DD HH:mm] Bug: <short title>
- **Error**: (Exact error message or symptom)
- **Root Cause**: (What actually caused it — be specific)
- **File(s) Modified**: (e.g., `src/app/page.tsx`)
- **Fix Summary**: (What was changed and why it resolved the issue)
- **Prevention Note**: (What to watch out for in the future)
-->
