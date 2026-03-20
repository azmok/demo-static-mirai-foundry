# Session Log

This file stores session summaries, key decisions, and ongoing context for AI agents working on this project.
Read this file at the START of every session before taking any action.

---

### [2026-03-20 Session 3] Dev Server Setup & Nav Link Repair
- **Learned/Decided**: Added `browser-sync` for hot-reload dev server as pnpm dev dependency. Verified all internal links were broken due to missing `.html` extensions and corrected them across all 4 pages.
- **Preferences**: Azuma wants a local dev environment with hot-reload. `package.json` was created to manage the `dev` and `start` scripts.
- **Plan Impact**: Local development is now streamlined with `pnpm dev`. All internal navigation must strictly use `.html` extensions for static compatibility.

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
