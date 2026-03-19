# Protected Files & Scope-Lock Templates

## Protected Files (Read-Only unless explicitly unlocked by Azuma)

| File / Directory | Reason |
|---|---|
| `next.config.ts` | Static export config — changes here can break the entire build |
| `tailwind.config.ts` | Global design tokens — changes affect the whole site visually |
| `pnpm-lock.yaml` | Lockfile integrity — never edit manually |
| `.env.local` | Credentials — read only, never overwrite or log contents |

---

## Scope-Lock Declaration Templates

Copy and paste the appropriate template at the start of any task.

### UI Component Fix
```
I will ONLY modify [ComponentName] located at [file path].
Specifically: [what will change].
Nothing else will be touched — no parent layouts, no shared utilities, no sibling components.
```

### Style Fix
```
I will ONLY modify the Tailwind classes on [element] in [file path].
No other classes, components, or files will be changed.
```

### Logic Fix
```
I will ONLY modify [function/hook name] in [file path].
No UI changes, no imports outside this file, no structural refactoring.
```
