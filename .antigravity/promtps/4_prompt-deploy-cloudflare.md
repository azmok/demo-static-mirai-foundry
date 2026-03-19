## Task: Deploy static site to Cloudflare Pages

This is a plain static site (HTML/CSS/JS only, no framework).

### Step 1: Verify project structure

Confirm the following files exist in the project root:
- `index.html`
- Any additional `.html`, `.css`, `.js` files

Do NOT run any build command. The project root is the deploy target as-is.

---

### Step 2: Create required Cloudflare config files

Create `_headers` in the project root if it doesn't exist: