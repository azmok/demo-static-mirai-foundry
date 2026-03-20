# Session Log

This file stores session summaries, key decisions, and ongoing context for AI agents working on this project.
Read this file at the START of every session before taking any action.

---

### [2026-03-20] Mobile Menu & Nav Links Fix
- **Learned/Decided**: All 4 HTML pages were missing the mobile menu overlay HTML, the `<script src="./menu.js">` load tag, and proper hamburger button IDs. `contact.html` had no hamburger button at all. Nav links used `./filename.html` instead of root-relative paths (`/`, `/about`, `/works`, `/contact`).
- **Preferences**: Azuma wants navigation menu functionality verified end-to-end on every task. Added a mandatory Navigation Menu Check to `rules.md §9`. Bug recorded in `bug-history.md`.
- **Plan Impact**: Future tasks touching any HTML page must run the §9 checklist: overlay HTML present, button IDs correct, `menu.js` loaded, links use root-relative paths.

---

### [YYYY-MM-DD HH:mm] Initial Setup
- **Learned/Decided**: Project initialized as Next.js static export site, deployed to Cloudflare Pages.
- **Preferences**: pnpm only, no pip, Tailwind CSS for styling. Agent must follow surgical scope rules in rules.md.
- **Plan Impact**: All future tasks must respect `output: 'export'` constraints — no server-side APIs, no dynamic image optimization.
