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

---

### Step 3: Commit config files

```bash
git add .
git commit -m "add Cloudflare config files"
git push origin main
```

---

### Step 4: Deploy via Wrangler CLI

Install wrangler if not available:
```bash
pnpm add -D wrangler
```

Ensure Node.js v20 is active:
```bash
fnm install 20 && fnm use 20
```

Deploy the project root directly:
```bash
npx wrangler pages deploy . --project-name YOUR_PROJECT_NAME
```

Replace `YOUR_PROJECT_NAME` with the Cloudflare Pages project name.
If the project doesn't exist yet, Wrangler will prompt to create it.

---

### Step 5: Confirm success

Report to the user:
- The Cloudflare Pages URL
- Deployment status