## Task: Adjust navigation and start local dev server

### Context
Stitch で出力された複数の静的HTMLファイルが存在する。
各ページのナビゲーションを統一・修正し、ローカルでの確認環境を立ち上げる。

---

### Step 1: Scan existing HTML files

List all `.html` files in the project root.
Treat `index.html` as the reference file for navigation structure, color scheme, and hover effects.

---

### Step 2: Infer navigation items

From `index.html`, extract:
- All navigation items (labels and their linked filenames)
- The correct display order as intended by the design

Use this as the single source of truth for all subsequent steps.

---

### Step 3: Fix navigation across all HTML files

Apply the following fixes to ALL `.html` files found in Step 1:

1. **Structure**: Replace each file's `<nav>` with the one extracted from `index.html`
2. **Links**: Update each nav link's `href` to point to the correct `.html` file in the project root
3. **Active state**: If the design uses an active/current state on nav items, apply it so each page highlights its own nav item correctly
4. **Consistency**: Color scheme and hover effects must match `index.html` exactly

Do NOT modify any content outside of the `<nav>` element.

---

### Step 4: Start browser-sync

Run the following command in the project root:

```bash
pnpm dlx browser-sync start --server --files "**/*.html, **/*.css, **/*.js"
```

Local URL: `http://localhost:3000`

Report to the user that the server is running and file changes will auto-reload in the browser.