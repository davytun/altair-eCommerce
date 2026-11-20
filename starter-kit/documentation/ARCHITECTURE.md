# Architecture

## Summary
A **single-page, client-rendered React landing page** per product. Product content comes from a typed configuration. API services communicate directly with approved public ERP endpoints when browser CORS is permitted. Company-provided PHP tracking runs in the published `index.php` head. The build/package pipeline creates an upload-ready ZIP.

```text
Visitor → index.php (PHP renders tracking head)
        → browser loads Vite JS/CSS assets
        → React product explanation + offer selection + form
        ├─ POST ERP abandonment (debounced; non-blocking)
        └─ POST ERP order create (explicit submit)
             └─ 201 success → Meta Purchase → ERP thank-you URL
```

## Proposed folders (not yet generated)
```text
src/
  components/       # UI-only product sections and form fields
  config/product.ts # content and approved offer IDs
  hooks/            # form/session/debounce behavior
  services/         # ERP HTTP adapters and centralized tracking
  types/            # typed config and ERP response types
  App.tsx
  main.tsx
scripts/            # build transform and ZIP packaging
public/             # copied static media
 templates/         # company-approved PHP snippet, once supplied cleanly
index.html          # Vite dev entry, not final deployment entry
vite.config.ts
```

## Design choices
- No router needed for a single product page; links/CTAs scroll to form.
- No application database. ERP owns orders and abandonment records.
- Single product config with explicit offer IDs; do not infer IDs from prices/labels.
- UI can render optional sections based on config; don't build a generic CMS in v1.
- API service handles fetch, response validation, request state, errors. UI does not embed endpoint strings.
- Tracking service is the only place firing browser events.
- Session ID stable for the landing page's browser session and passed to both ERP endpoints.
- Allow retry on network failures while preventing concurrent submissions. ERP-side idempotency remains an open question.

## Browser / host assumptions
- Host executes PHP for `index.php` and serves the nested directory's assets.
- `base: './'` in Vite allows static assets in a product subdirectory.
- ERP allows requests from each deployed page origin; otherwise an **approved proxy** is required (not a workaround).
- Cross-origin tracking and order-creation behavior must be verified on staging.

## Architectural boundaries
No React SSR, Laravel backend, custom payments, admin interface, local order database, or browser-visible secret key in v1.
