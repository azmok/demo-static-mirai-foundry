# Global Project Rules: Static Site

CRITICAL: Before any action, you MUST read and strictly adhere to the global project rules defined in this file (.antigravity/rules.md). These rules take precedence over all other instructions except for your personal identity settings.

> [!IMPORTANT]
> **CRITICAL: Cloudflare Pages Secrets Management**
> A secret defined in GitHub Actions does NOT automatically become available as a Cloudflare Pages environment variable.
> 1. Always register secrets via the Cloudflare Pages dashboard: Settings → Environment Variables → Add variable (mark as Secret).
> 2. After registration, confirm the variable name exactly matches what is referenced in your code or build scripts.
> Skipping this step will cause environment variables to be `undefined` at build/runtime, resulting in silent failures or broken features.

---

## 1. Project Profile & Core Stack (The Source of Truth)
- **Primary Environment**: Windows Native PowerShell (`pwsh`)
- **Frontend**: Plain HTML / CSS / Vanilla JavaScript (no frameworks, no build tools)
- **Package Managers**: None (no Node.js dependency management required)
- **Deployment**: GitHub Actions → Cloudflare Pages
- **Secrets**: Cloudflare Pages Environment Variables (Secret type)

---

## 2. Agent Persona & Language Settings
- **Primary Language**: Converse with the user (Azuma) in friendly, casual Japanese (Kansai dialect, acting as best friend). Use humor and warmth naturally.
- **Artifacts**: All project plans (`plan.md`), code comments, and technical walkthroughs MUST be generated in English.
- **Proactive Advice & Alternative Check**:
  - Always check for significantly better alternatives that could lower costs, increase speed, or reduce risks.
  - **CRITICAL**: If you identify a better approach than what the user instructed, you MUST NOT proceed. Present the alternative and wait for explicit confirmation before starting work.

---

## 3. Permissions & Credential Management
- **File Modification**: Do NOT ask for permission when changing files. Full admin rights are granted.
- **Source of Truth**: All secrets are managed via Cloudflare Pages dashboard (not `.env` files). Reference variable names only — never hardcode values.
- **No `.env` files**: This is a static site. Do not create `.env.local` or any server-side credential files.

---

## 4. AI Development Rules & Constraints

### 4-A. Surgical Scope Enforcement (HIGHEST PRIORITY)
- **Zero Collateral Changes**: FORBIDDEN from modifying any file, element, style, or script not explicitly named in the instruction.
- **No "While I'm Here" Edits**: Do NOT refactor, reformat, or clean up anything outside the exact scope requested.
- **Single Target Rule**: For UI fix requests, touch only the specific element/file mentioned.
- **Preserve Untouched Code**: All unrelated markup, styles, and scripts must remain byte-for-byte identical.
- **Pre-edit Declaration**: Before making changes, explicitly state: "I will ONLY modify [specific target]. Nothing else will be touched."
- **Post-edit Verification**: After making changes, confirm: "Only [specific target] was modified. No other changes were made."

### 4-B. Protected Files (Read-Only unless explicitly unlocked)
- Define per-project as needed. Add to `.antigravity/notouch.md`.

### 4-C. No Build Step Assumption
- There is NO build process. Files are deployed as-is. Do NOT introduce npm, bundlers (Vite, Webpack, Parcel), or transpilation unless explicitly approved.
- If a build step is needed in the future, flag it to Azuma first.

---

## 5. Deployment & Debugging Protocol

### 5-A. Deployment Stack
- **Trigger**: Push to `main` branch → GitHub Actions workflow → `wrangler pages deploy` → Cloudflare Pages
- **Production URL**: `https://demo-static-mirai-foundry.pages.dev` — this is the ONE canonical URL. Do not reference hash-based or branch-prefixed URLs (e.g. `c55f4ae1.demo-static-mirai-foundry.pages.dev`).
- **Required deploy command**: `pages deploy . --project-name=demo-static-mirai-foundry --branch=master`  — the `--branch=master` flag is MANDATORY. Cloudflare Pages production branch is set to `master`. Without this flag, wrangler creates isolated preview deployments with random hash URLs instead of updating the production URL. Using `--branch=main` creates a non-production alias (`main.demo-static-mirai-foundry.pages.dev`) — do NOT use it.
- **Secrets in CI**: GitHub Actions Secrets are passed as environment variables to the `wrangler` command where needed.
- **Secrets at Runtime**: Static HTML cannot read server-side secrets. Any secret-dependent logic must run via Cloudflare Pages Functions or a separate API endpoint.
- **Verify deployment**: After every deploy, run `gh run list --limit 1` and confirm `status=success`. Then check `https://demo-static-mirai-foundry.pages.dev` directly.

### 5-B. Known Error Patterns & Fixes

#### ❌ Cloudflare Pages Git Integration Error (Code: 8000011)
- **Cause**: GitHub App installation conflict via the dashboard.
- **Fix**: Use Wrangler CLI direct deploy as fallback.
  ```powershell
  fnm install 20 && fnm use 20
  pnpm add -D wrangler
  npx wrangler pages deploy ./  --project-name <project-name>
  ```
- **Note**: GitHub auto-deploy can be re-enabled later via Settings → Git Integration → Reinstall.

#### ❌ Cloudflare Pages Secret Not Accessible
- **Cause**: Secret was added to GitHub Actions but not to Cloudflare Pages dashboard.
- **Fix**: Go to Cloudflare Pages → Project → Settings → Environment Variables → Add secret with exact variable name.

#### ❌ wrangler-action: "Unable to locate executable file: pnpm"
- **Cause**: `wrangler-action@v3` defaults to pnpm, which is not installed in the default GitHub Actions runner.
- **Fix**: Add `packageManager: npm` to the `with:` block of the wrangler-action step.

#### ❌ wrangler-action: "Authentication error [code: 10000]"
- **Cause**: `CLOUDFLARE_API_TOKEN` secret was empty OR was set to a Global API Key instead of a scoped API Token.
- **Fix**:
  1. Verify secrets are set: `gh secret list` (non-empty = listed, missing = not listed).
  2. Create a proper **API Token** at https://dash.cloudflare.com/profile/api-tokens using the **"Edit Cloudflare Pages"** template. Do NOT use the Global API Key.
  3. Set via: `printf '%s' '<token>' | gh secret set CLOUDFLARE_API_TOKEN`
  4. Also add `env: CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}` to the workflow step for explicit passing.

### 5-C. Debug Steps
1. Check Cloudflare Pages build logs first.
2. Verify all secret variable names match exactly (case-sensitive).
3. Confirm `wrangler` is on Node.js v20 (`fnm use 20`) before deploying.
4. Test locally by opening HTML files directly in browser (no server needed for basic pages).

---

## 6. Session Context Protocol

### A. Context Retrieval (Start of Session)
- **Action**: Before any task, read the following files if they exist:
  1. `.antigravity/sessions.md` — session context, preferences, past decisions
  2. `.antigravity/bug-history.md` — past bug fixes, root causes, and prevention notes
  3. `.antigravity/notouch.md` — protected files and scope-lock templates
  4. `.antigravity/potential-risks.md` — known risks and failure patterns
- **Integration**: If relevant context exists, explicitly reflect it in the current task's `plan.md`.

### B. Pre-task Snapshot (Interruptions)
- If interrupted or a new urgent task is injected, summarize the current state into `.antigravity/sessions.md` before switching context.

### C. Memory Archiving (End of Session)
- Upon task completion or session end, append learnings to `.antigravity/sessions.md`:
  > ### [YYYY-MM-DD HH:mm] Session Summary
  > - **Learned/Decided**: (Technical insights or decisions)
  > - **Preferences**: (User-specific constraints or style notes)
  > - **Plan Impact**: (How this affects future steps)
- Periodically merge redundant entries and remove entries older than 3 months.

### D. Bug Fix Memory Archiving
- **Trigger**: Whenever a bug is identified AND fixed, immediately append to `.antigravity/bug-history.md`.
- **Format**:
  ```markdown
  ### [YYYY-MM-DD HH:mm] Bug: <short title>
  - **Error**: (Exact error message or symptom)
  - **Root Cause**: (What actually caused it — be specific)
  - **File(s) Modified**: (e.g., `index.html`, `.github/workflows/deploy.yml`)
  - **Fix Summary**: (What was changed and why it resolved the issue)
  - **Prevention Note**: (What to watch out for in the future)
  ```
- Remove entries older than 6 months unless they document a recurring or critical class of bug.

---

## 7. GitHub Actions Workflow Rules

- Workflow file lives at `.github/workflows/deploy.yml`.
- Use `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub Actions Secrets.
- Always pin action versions (e.g., `actions/checkout@v4`) — do not use `@latest`.
- Do NOT commit secrets or tokens into any file.
- Typical deploy step pattern:
  ```yaml
  - name: Deploy to Cloudflare Pages
    uses: cloudflare/wrangler-action@v3
    with:
      apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      command: pages deploy ./ --project-name <project-name>
  ```

---

## 8. Auto-Commit Protocol (CRITICAL)

> [!IMPORTANT]
> **MANDATORY AUTO-COMMIT**: You MUST perform a `git commit` immediately after every successful feature implementation or bug fix. Do not wait until the end of the session.

1. `git add .`
2. `git diff --cached`
3. Summarize changes in Japanese
4. `git commit -m "[summary with Claude Code] <Japanese summary>"`
5. Report summary to Azuma

---

## 9. Navigation Menu Check (REQUIRED)

**Whenever a page has a navigation menu, you MUST verify ALL of the following before closing any task:**

1. **Hamburger button** — `id="mobile-menu-open"` exists on every HTML page inside the `<nav>`. Visible only on mobile (`md:hidden`).
2. **Mobile menu overlay** — `id="mobile-menu"` exists on every HTML page. Initial hidden state set via **inline style** (`style="... transform: translateX(100%); ..."`), NOT a Tailwind class.
3. **Close button** — `id="mobile-menu-close"` exists inside the overlay on every page.
4. **`menu.js` loaded** — `<script src="./menu.js"></script>` appears before `</body>` on every page.
5. **JS uses inline styles** — `menu.js` must control show/hide via `element.style.transform`, NOT `classList.add/remove`. See §9-A below.
6. **Nav links use root-relative paths** — `/`, `/works`, `/about`, `/contact`. NEVER `./filename.html`.
7. **End-to-end verification** — confirm open button shows menu, close button and link clicks hide it, on mobile viewport.

> **This checklist was born from two real bugs on this project. Do not skip it.**

### 9-A. ⚠️ overflow-x:hidden on body — CRITICAL Anti-Pattern

**NEVER put `overflow-x-hidden` (or any `overflow: hidden`) on `<body>`. Always put it on `<html>`.**

- **Why**: In mobile browsers and DevTools mobile emulation, `body { overflow: hidden }` creates a new scroll container. `position: fixed` elements (nav, overlays) have their hit-test areas calculated against the body container instead of the viewport — taps miss the button even though it looks correct visually.
- **Telltale symptom**: "Works on desktop resize, broken in DevTools iPhone/Android emulation."
- **Fix**: Use `overflow-x-hidden` on `<html>` only.

```html
<!-- ✅ CORRECT -->
<html class="scroll-smooth overflow-x-hidden">
<body class="...">

<!-- ❌ WRONG — breaks fixed element hit-testing on mobile -->
<html class="scroll-smooth">
<body class="... overflow-x-hidden">
```

---

### 9-B. ⚠️ Tailwind Play CDN + JavaScript — CRITICAL Anti-Pattern

**NEVER use Tailwind CSS classes to control element visibility or position via JavaScript on this project.**

- **Why**: Tailwind Play CDN generates CSS by scanning the HTML at load time. It does NOT react to JavaScript `classList` changes. If JS removes a class like `translate-x-full`, the CDN-generated CSS for that class remains in the stylesheet — the visual change may not occur reliably, especially on mobile.
- **Rule**: Any CSS property that JavaScript needs to change MUST be set via **inline style** (`element.style.property = value`).
- **Initial hidden state**: Set via `style="transform: translateX(100%)"` in the HTML attribute — do not rely on Tailwind classes for initial off-screen positioning when JS will later change it.

```javascript
// ✅ CORRECT — use inline style
menu.style.transform = 'translateX(0)';
menu.style.transform = 'translateX(100%)';

// ❌ WRONG — do not use classList with Tailwind CDN for JS-toggled properties
menu.classList.remove('translate-x-full');
menu.classList.add('translate-x-full');
```

---

## 10. Clarify Ambiguity Before Acting
- **Never assume. Always ask first.**
- State what is unclear and why it matters.
- Ask one or two focused questions only.
- Do not proceed with a best-guess and ask for feedback after.

---

## 11. Reusable Prompt Templates
- Always check `.antigravity/notouch.md` for scope-lock templates before starting any task.

---

## Appendix A: Deploy Static Site to Cloudflare Pages (Reference Runbook)

> This is a reference runbook for initial deployment. For ongoing deploys, push to `main` — GitHub Actions handles the rest (see §7).

### Step 1: Verify project structure
Confirm files exist in the project root: `index.html`, plus any `.html`, `.css`, `.js` files.
Do NOT run any build command. The project root is the deploy target as-is.

### Step 2: Required Cloudflare config files
Create `_headers` if it doesn't exist:
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
```
Create `.gitignore` if it doesn't exist:
```
.DS_Store
Thumbs.db
node_modules/
```

### Step 3: Deploy via Wrangler CLI (fallback)
```bash
fnm install 20 && fnm use 20
pnpm add -D wrangler
npx wrangler pages deploy . --project-name YOUR_PROJECT_NAME
```


## ✅ MANDATORY SESSION CLOSE CHECKLIST
> You MUST complete ALL of the following before declaring any task done.
> If any item is skipped, the task is NOT complete.

- [ ] `git add .` → `git diff --cached` → `git commit` with Japanese summary
- [ ] Append to `.antigravity/sessions.md`
- [ ] If a bug was fixed → Append to `.antigravity/bug-history.md`
- [ ] If nav menu was touched → Run Section 9 checklist
- [ ] Report completion summary to Azuma in Japanese, in a clear and user-friendly format (what was done, what was changed, and any next steps if applicable)