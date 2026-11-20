# Product Requirements Document (PRD)

## FlexShop Sales Page Starter Kit

**Version:** 1.0  
**Status:** Draft — ready for implementation planning  
**Product type:** Internal developer starter kit  
**Primary users:** Developers producing product-specific sales pages  
**Target deployment:** Company-hosted PHP-capable web server (e.g. cPanel)

---

## 1. Overview

Build a reusable starter kit for producing **standalone, conversion-focused product sales pages** for FlexShop. These are **not full e-commerce storefronts**: each page explains a product clearly, presents its offers, captures customer details, and sends the submitted order to the company's existing ERP.

Developers build with **React, Vite, TypeScript and Tailwind CSS**. A production build produces a **ZIP** containing `index.php` and all assets, ready for the company to upload to supported hosting. PHP is used only as a deployment entry file and to execute the company's shared tracking include; page UI remains React.

### Goals

1. Reuse a stable foundation rather than rebuilding each page.
2. Target **under 2 hours of developer production time per page** once the kit and product assets are ready (a target, not a guarantee).
3. Support batches of **5–10 distinct pages** without duplicate integration work.
4. Make the product understandable even to a young reader through plain language, pictures, video, and simple demonstrations.
5. Ensure accurate ERP order creation, abandonment reporting, and Meta Purchase event handling.
6. Deliver simple, portable ZIP archives that can be uploaded without Node.js on the server.

### Non-goals

- Shopping carts, multi-product checkout, customer accounts, order history or payments handled on the page.
- Replacing or rebuilding the ERP.
- PHP application development, Laravel, SSR, or a Node.js server in production.
- An all-purpose website builder or content management system in v1.
- Implementing unconfirmed analytics vendors or inventing ERP API fields.

---

## 2. Core user journeys

### Visitor journey

1. Visitor lands on a product-specific URL, possibly containing UTM and `fbclid` parameters.
2. Page immediately communicates **what the product is, what problem it solves, and how it works**.
3. Visitor reviews photos, a short demo/video (where available), benefits, price/offer, and relevant supporting content.
4. Visitor selects an offer and supplies the required contact and delivery details.
5. As the form is completed, the page sends debounced abandonment updates to the ERP.
6. Visitor submits the form; page creates the order in the ERP.
7. On confirmed HTTP `201` with `success: true`, page fires the browser Meta Purchase event using ERP-provided order information and redirects to ERP-provided `thank_you_url`.
8. On HTTP `202` queued response, the page **does not fire Purchase** and follows the ERP's confirmed queued-order handling policy (to be clarified).
9. On validation, network or server errors, the page shows a clear, actionable message and does not claim an order was placed.

### Developer journey

1. Copy or initialize the starter kit for a new product.
2. Configure product-specific title, description, offer identifiers/prices, theme and media.
3. Pick a reusable page layout; enable only relevant sections.
4. Check the order form and integrations without editing their internals.
5. Run validation/build; automatically generate `index.php` and assets.
6. Verify the generated files in PHP-enabled staging hosting.
7. Export an upload-ready ZIP named for the product slug.

---

## 3. Functional requirements

### FR-01 — Config-driven product setup (Must)

- Each page has a central typed product configuration.
- Required product configuration includes `slug`, `name`, `headline`, short plain-language description, image list, theme, and ERP offer/product IDs.
- Optional fields include videos, demonstrations, benefits, FAQs, testimonials and additional offer information.
- Product-specific content and design changes must **not require modifying ERP service or tracking logic**.
- Invalid or missing required config produces an actionable build-time error when feasible.
- Price labels on the UI must come from approved product/offer configuration; the ERP response remains authoritative for confirmed order value.

### FR-02 — Reusable sections (Must)

- Hero section with image, headline, description and CTA.
- Product benefits and feature explanation using plain language.
- Responsive image gallery, with video/demo section when supplied.
- Configurable offer selection, with the approved ERP `product_id` for each offer.
- CTA buttons that lead to, reveal or focus the inquiry/order form.
- Reusable accessible form and basic footer.
- Optional FAQ, social proof/testimonials and other explanatory sections.
- Sections may be hidden or reordered through an explicit configuration mechanism where reasonable.

### FR-03 — Design principles (Must)

- **Mobile-first**, responsive across common phone, tablet and desktop widths.
- Clean, minimal structure that supports bold direct-response sales colours (including red and yellow), rather than a rigid luxury aesthetic.
- Strong visual hierarchy, high-contrast text, clear CTAs and easy-to-scan sections.
- Everyday language: explain the product's purpose before listing technical features.
- Avoid clutter, unsupported claims, fake urgency and fabricated testimonials.
- Use descriptive image alt text, labeled fields, visible focus indicators and keyboard-accessible interactions.
- Optimize media for loading speed; load noncritical video/media lazily where possible.

### FR-04 — Customer/order form (Must)

Collect the following fields for the ERP order request:

| Field | Requirement |
| --- | --- |
| `customer_name` | Required |
| `product_id` | Required; selected approved offer/product ID |
| `mobile_number` | Required |
| `home_address` | Required |
| `delivery_state` | Required |
| `email_address` | Optional |
| `whatsapp_number` | Optional |
| `landing_page_url` | Page URL, including query parameters |
| `session_id` | Also include the abandonment session ID in order creation, per ERP guidance |

- Validate required fields before submission.
- Avoid unnecessary optional fields or a multi-step checkout unless user testing demonstrates a need.
- Disable repeat submission while a request is in flight.
- Keep server/API failures visible and permit retry without falsely reporting success.
- Store only the minimum data necessary client-side; never put personal details in the URL.

### FR-05 — Public order intake (Must)

**Endpoint:** `POST https://erp.flexshop.ng/api/orders/create`

**Confirmed success behavior:** HTTP `201` and response body `success === true`; use **`body.data`**, not the entire body.

Expected `data` fields:

| Field | Purpose |
| --- | --- |
| `id` | ERP order ID; source for browser Meta event ID |
| `total` | Order value in **NGN major units** (e.g. `29900`, not kobo) |
| `order_number` | Public-facing reference |
| `customer_name` | Customer name for display if needed |
| `thank_you_url` | Approved post-success redirect |
| `recommended_products` | Optional ERP-provided post-order recommendations |

- Use the ERP response as the source of truth for confirmed order ID, amount and redirect.
- Do not infer a successful order based only on a network request completing.
- Do not fire a Purchase event for `202` queued responses (ERP documentation explicitly excludes it).
- The **exact JSON order request envelope**, error schemas and queued-response behavior require confirmation before implementation; field names above do not by themselves establish nesting/encoding.
- If the endpoint does not allow browser requests under the company's CORS policy, coordinate an approved same-origin or server-side proxy with the company. Do not bypass browser security controls or expose private API secrets.

### FR-06 — Abandonment intake (Must)

**Endpoint:** `POST https://erp.flexshop.ng/api/public/abandonment`

Required on every request:

- `session_id`: stable per visitor/page session; generated with `crypto.randomUUID()` where supported.
- `funnel_slug`: page's configured sales funnel/product slug.
- `page_url`: **`window.location.href`**, preserving full query string, UTMs and `fbclid`.

Optional form fields are sent in a `fields` object, using ERP-accepted names:

- `phone` / `mobile_number`
- `name` / `customer_name` / `full_name`
- `email` / `email_address`
- `address` / `home_address`
- `whatsapp_number`
- `product_id` — **only after the visitor explicitly selects an offer**.

Behavior:

- Debounce updates for **3 seconds** after typing stops.
- Use the same `session_id` when creating the order, allowing ERP to clear the abandonment record.
- Avoid multiple redundant requests for unchanged state.
- Fail gracefully if abandonment tracking fails; do not block order submission.
- Do not send an unselected/default product as an intentional offer click.
- Respect company privacy/cookie and tracking requirements.

Example shape:

```json
{
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "funnel_slug": "flexfind-pro",
  "page_url": "https://flexshop.ng/flexfind-pro/?utm_source=facebook",
  "fields": {
    "phone": "08012345678",
    "name": "Ada Okoro",
    "product_id": 42
  }
}
```

### FR-07 — Tracking integration (Must)

**Head PHP include:** The company provided a PHP snippet that walks up the directory tree looking for `includes/store-tracking.php`, then calls `store_tracking_head()`.

- Preserve the supplied PHP logic verbatim in an approved, versioned template, subject to PHP syntax validation of the clean original snippet.
- Insert it **into the final production `index.php` head** at a position where it runs on the server before the page's browser scripts need `fbq`.
- Do not place raw PHP inside React/TSX.
- The host must support PHP and provide a readable `includes/store-tracking.php` at one of the paths searched by the snippet.
- If the include is missing, the existing snippet renders a `dead_store_tracking` marker; surface this as a failed staging/deployment check, not a successful analytics setup.
- The head snippet is described as already loading Meta Pixel `fbq` and PageView. **Do not duplicate PageView**.
- The user's Microsoft integration is **not yet identified**. Treat Microsoft Clarity/UET/etc. as an unconfirmed vendor-specific script; integrate only once actual code and intended events are provided.

**Browser Purchase:** After HTTP `201` and `body.success === true`:

```ts
const order = body.data;

if (typeof window.fbq === "function" && order?.id) {
  const parsed =
    typeof order.total === "number"
      ? order.total
      : Number(String(order.total ?? "").replace(/[^\d.]/g, ""));

  window.fbq("track", "Purchase", {
    value: Number.isFinite(parsed) && parsed > 0 ? parsed : 0,
    currency: "NGN"
  }, {
    eventID: `erp_meta_purchase_${order.id}`
  });
}

if (order?.thank_you_url) {
  window.location.assign(order.thank_you_url);
}
```

- Browser `eventID` format must exactly match ERP CAPI deduplication convention: `erp_meta_purchase_<id>`.
- Never multiply or divide `total` by 100.
- Do not trigger Purchase on invalid, failed or queued orders.
- For missing/invalid `thank_you_url`, follow an approved fallback success-screen policy instead of assuming a URL.
- Verify that `thank_you_url` is an approved HTTPS destination before redirecting; avoid arbitrary redirects if the response is compromised.
- The provided JS example has a typo: use `/[^\d.]/g`, not `/[^d.]/g`.

### FR-08 — Build and ZIP delivery (Must)

- Developer runs one documented command such as `npm run package`.
- The command builds static React assets with Vite, transforms/renames `dist/index.html` into **`dist/index.php`**, inserts the approved PHP head snippet, and packages the output into a ZIP.
- Set `base: "./"` in Vite so assets use relative URLs and pages can be deployed under product subdirectories.
- PHP code must execute server-side; simply using the `.php` extension does not run PHP in a static hosting environment.
- Do not copy source TypeScript, `node_modules`, build secrets or development-only files into the archive.
- Validate that `index.php` contains the tracking marker/snippet exactly once, build assets exist, and no `index.html` is shipped unless explicitly required.
- Default ZIP contents:

```text
flexfind-pro.zip
  index.php
  assets/
    index-[hash].js
    index-[hash].css
    ...media...
```

- Support uploading the contents into a specific cPanel product directory, e.g. `/public_html/flexfind-pro/`.
- Validate upload on PHP-enabled staging, because `vite preview` is not a reliable verification environment for a renamed PHP entry file.

### FR-09 — Quality and diagnostics (Must)

- Basic automated checks: typecheck, production build, required config validation, package content validation.
- Manual QA checklist: mobile layout, asset loading from subdirectory, accurate offer IDs, form validation, order success/error/queued behavior, ERP order confirmation, abandonment debouncing, `session_id` continuity, Pixel event deduplication ID, thank-you redirect, PHP include availability.
- No sensitive data, tokens, or internal stack traces in user-facing errors.
- Logging should exclude or redact customer phone, address, and other personal data.

---

## 4. Proposed implementation structure

```text
flexshop-sales-kit/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── Benefits.tsx
│   │   ├── VideoDemo.tsx
│   │   ├── OfferSelector.tsx
│   │   ├── OrderForm.tsx
│   │   └── FAQ.tsx
│   ├── config/
│   │   └── product.ts
│   ├── services/
│   │   ├── orders.ts
│   │   ├── abandonment.ts
│   │   └── tracking.ts
│   ├── hooks/
│   │   └── useAbandonment.ts
│   ├── App.tsx
│   └── main.tsx
├── scripts/
│   ├── build.mjs
│   └── package.mjs
├── templates/
│   └── store-tracking-head.php
├── public/
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

**Architecture principles**

- Keep UI sections independent of ERP networking.
- Centralize ERP API calls, form mapping and error handling.
- Use small typed interfaces for order success, abandonment payload and product configuration.
- Keep tracking events in one service to prevent duplicate firing.
- Use one stable visitor `session_id` per page session and send it to both endpoints.
- Avoid extra abstractions until actual products require them.

---

## 5. Acceptance criteria

The first version is accepted when:

1. A developer can configure and publish one complete product sales page without editing ERP/tracking internals.
2. The page works on a modern mobile browser and a desktop browser.
3. The same page renders correctly under a nested subdirectory on a PHP-enabled host.
4. The form validates required fields and submits a real order to the approved ERP endpoint.
5. A `201` successful order uses `body.data`, fires **one** browser Purchase call with `eventID = erp_meta_purchase_<id>` and value in NGN, and redirects to the ERP thank-you URL.
6. A `202` response does **not** fire Purchase.
7. Abandonment tracking includes stable `session_id`, `funnel_slug`, the complete page URL, debounced form data, and only includes `product_id` after offer selection.
8. The same `session_id` is included in order creation.
9. The final ZIP includes `index.php` and loadable assets, and the head snippet works with the company's shared PHP include.
10. The build can be repeated for another product by changing configuration/media, not duplicating API/tracking logic.

---

## 6. Delivery phases

### Phase 1 — Starter foundation

- React + Vite + TypeScript + Tailwind setup.
- Central product config, responsive baseline and sample page sections.
- Local development/build scripts.

### Phase 2 — ERP order flow

- Offer selection and validated inquiry/order form.
- Orders API service, response handling, error states, confirmed-success redirect.

### Phase 3 — Abandonment and analytics

- Session ID and 3-second debounced abandonment updates.
- PHP tracking head insertion, Meta Purchase logic and test/verification.
- Microsoft integration only after exact script/provider is supplied.

### Phase 4 — Packaging and repeatability

- One-command ZIP packaging.
- cPanel staging test, README/runbook, repeat-use QA checklist.
- Trial run with 2 different products to confirm reuse.

---

## 7. Dependencies and open questions

The following are **not implementation assumptions** and must be confirmed with the company's actual technical specification:

1. Exact JSON structure accepted by `POST /api/orders/create`, including where `session_id` belongs, required HTTP headers, and whether browser requests are allowed by CORS.
2. Expected `202` queued-order UI, follow-up, and redirect behavior.
3. ERP validation/error response formats and duplicate submission/idempotency behavior.
4. Whether the Microsoft script is Clarity, UET, or another product, and where/how it should be loaded.
5. Whether every deployed page can access the shared `includes/store-tracking.php` file using the supplied relative-parent search.
6. Whether the PHP include inserts only Pixel/PageView or also extra HTML/scripts that influence hydration or loading order.
7. Approved rules for page URL, funnel slug, offer IDs, thank-you URL domains and privacy notice text.
8. Whether site media is hosted within each ZIP or loaded from an approved CDN.

The product can be scaffolded before these are resolved; **production order/analytics acceptance cannot be completed** without confirming the relevant contracts.

---

## 8. Success measures

- Typical production time per page: **target ≤ 2 hours**, with content and assets supplied.
- Repeat-use: create **5–10 pages** from the kit with no edits to shared ERP/tracking services.
- Packaging: 100% of tested ZIPs have valid PHP entry file and assets.
- Integration correctness: every tested confirmed ERP order yields the appropriate success flow; queued/failed orders yield no Purchase event.
- Tracking quality: full campaign URLs preserved and stable abandonment/order session identity.

**Guiding principle:** Build a reusable system for clear, persuasive product explanations and reliable ERP order intake — not a full shopping platform.
