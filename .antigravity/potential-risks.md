# Potential Risks & Failure Patterns

This file documents known risks, gotchas, and failure patterns specific to this project's stack.
Read this before starting any task that touches the areas listed below.

---

## Next.js Static Export (`output: 'export'`)

| Risk | Detail | Prevention |
|---|---|---|
| Server-side features used accidentally | `getServerSideProps`, API routes, middleware are incompatible with static export | Always check: does this feature run at request time? If yes, it will break the build. |
| Dynamic routes not pre-generated | Pages with `[param]` segments will 404 unless `generateStaticParams` is implemented | Add `generateStaticParams` for every dynamic route |
| `next/image` optimization breaks | Default image optimization requires a server — won't work in static export | Set `images: { unoptimized: true }` in `next.config.ts` or use static imports |
| `useRouter` on static pages | `router.query` is empty on first render in static export | Use `useSearchParams` or handle empty state gracefully |

---

## Cloudflare Pages Deployment

| Risk | Detail | Prevention |
|---|---|---|
| Wrong output directory | Cloudflare Pages must be set to `out/` not `.next/` | Always verify Pages settings: Build = `pnpm build`, Output = `out` |
| Environment variables not set | Cloudflare Pages env vars must be set in the dashboard, not just `.env.local` | After adding any new env var locally, add it in Cloudflare Pages dashboard too |
| Cache invalidation lag | CDN cache may serve stale content after deploy | Use Cloudflare's "Purge Cache" if updated content doesn't appear |

---

## Tailwind CSS

| Risk | Detail | Prevention |
|---|---|---|
| Purging used classes | Dynamically constructed class names (e.g., `` `text-${color}-500` ``) get purged | Use complete class strings or safelist in `tailwind.config.ts` |
| Dark mode conflicts | `color-scheme` not set → browser dark mode may invert colors unexpectedly | Force `color-scheme: light` in global CSS if dark mode is not intentionally supported |

---

## pnpm

| Risk | Detail | Prevention |
|---|---|---|
| `node_modules` phantom deps | pnpm's strict hoisting may break packages that assume flat `node_modules` | Check for peer dependency warnings after install; never use `npm` or `yarn` to install |
| Lockfile conflicts | Merging branches with different lockfile states | Always run `pnpm i` after pulling to sync lockfile |
