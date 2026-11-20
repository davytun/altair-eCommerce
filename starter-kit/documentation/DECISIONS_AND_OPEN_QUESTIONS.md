# Decisions and Open Questions

## Confirmed from the user/company notes
| ID | Decision / requirement |
| --- | --- |
| D-01 | Developers prefer React; a PHP-only app is not needed. |
| D-02 | Build with React + Vite + TypeScript; use Tailwind for fast reusable UI. |
| D-03 | Each product is its own sales landing page, **not** a cart/storefront. |
| D-04 | Produce deployable ZIP with `index.php` and static assets for a PHP-capable host. |
| D-05 | Company has existing ERP order and abandonment public endpoints. |
| D-06 | Order fields and 201 response fields documented in PRD/ERP_INTEGRATION. |
| D-07 | HTTP 202 must not fire Meta Purchase. |
| D-08 | Company PHP include provides head tracking; Meta Purchase is manual after success. |
| D-09 | Abandonment debounce 3s; same session ID sent on order creation. |
| D-10 | Product explainers should be visual, plain-language, mobile-first and fast to produce. |

## Questions that block production acceptance
| ID | Owner to confirm | Question | Impact |
| --- | --- | --- | --- |
| Q-01 | ERP team | Exact order-create JSON envelope, headers and required `session_id` placement? | Correct order submission |
| Q-02 | ERP team | Browser CORS allowed for all landing-page domains? If not, approved proxy? | Browser integration |
| Q-03 | ERP team | How should HTTP 202 queued orders display/redirect? | Accurate customer UX |
| Q-04 | ERP team | Error schema and idempotency/duplicate protection on timeout/retry? | Safe retry behavior |
| Q-05 | ERP team | Preferred alias names for abandonment `fields` values? | Consistent stored lead data |
| Q-06 | Infra/analytics | Canonical raw PHP snippet and installed `includes/store-tracking.php` path? | Functioning Pixel/PageView |
| Q-07 | Marketing | Microsoft product: Clarity, UET, or other? Provide exact script/events. | Avoid missing/duplicate tracking |
| Q-08 | Marketing/legal | Approved tracking consent/privacy statement and customer data handling? | Privacy compliance |
| Q-09 | Infra | Exact deployment directories, domain names, default index and PHP version? | Reliable ZIP deployment |
| Q-10 | ERP/marketing | Approved HTTPS thank-you URL host(s) and allowed success fallback? | Redirect safety |
| Q-11 | Product | Approved product IDs, offer prices, content, media and claim sources? | Correct sales page |
| Q-12 | QA/ERP | Where/how may developers submit test orders without polluting live data? | Safe acceptance testing |

## Decisions deferred deliberately
- No generic site builder, CMS, admin dashboard, dynamic backend, or multi-page client router in v1.
- No analytics vendor guessed or installed without provided script.
- No assumption that browser direct API calls are allowed until CORS checked.

## Change log
- 2026-11-17: initial documentation pack drafted from provided PRD and ERP notes.
