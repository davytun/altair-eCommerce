# AGENTS.md — Project Instructions

## Mission
Maintain a minimal, reusable React + Vite + TypeScript sales-page starter kit. Generate separate ZIP deliverables with `index.php` and assets for company deployment. Each page presents **one product with offers** and creates orders via the existing ERP. No cart/checkout/payment features.

## Sources of truth
- `PRD.md`: product and functional requirements.
- `ERP_INTEGRATION.md`: known HTTP behavior and data mapping.
- `TRACKING.md`: analytics and tracking rules.
- `DECISIONS_AND_OPEN_QUESTIONS.md`: unresolved details; do not guess.

## How to work
1. Work on **only the explicitly selected task**. Don't implement subsequent tasks proactively.
2. Inspect existing code and docs first. State relevant findings and a minimal change plan.
3. Keep changes localized, typed, readable, and testable. Prefer straightforward functions/components over abstractions.
4. After changes, run available typecheck, lint, tests and build; report exact outcomes and limitations.
5. Never silently revise business rules or invent API fields, headers, response types or integrations.
6. Do not alter or simulate the company's shared PHP tracking logic unless the original supplied code and host conditions are verified.
7. Keep product content/config separate from shared API, form, analytics and packaging code.

## Non-negotiable behavior
- React client app; Vite build; `base: './'`; PHP-capable deployed host.
- Produce `index.php` and required static assets in a ZIP; no Node server required in production.
- `landing_page_url` and abandonment `page_url` must preserve query parameters.
- 3-second debounced abandonment intake; stable `session_id` shared with order create.
- Send abandonment `product_id` **only after explicit offer click**.
- Meta Purchase only after HTTP **201** and `success === true`, using `body.data.id` and `body.data.total` in NGN; no Purchase on HTTP 202 or errors.
- Never duplicate the PageView from the company tracking include.
- The Meta Pixel is live: local tracking must default OFF; do not fire synthetic live PageView/Purchase or create fake production ERP orders. For CAPI tests, `test_event_code` must be authorized and supplied by the server-side integration owner; see TRACKING.md.
- Use the ERP thank-you URL only after validating it against approved HTTPS destinations.
- Avoid recording phone, address or customer identity in console/logs/analytics beyond explicitly approved ERP fields.
- No fabricated testimonials, urgency, product claims or reviews.

## Stop and escalate when
Exact order payload/headers/CORS, queued response, Microsoft tracking, tracking include path, or production credentials/permissions are missing. Create an interface or placeholder if useful, clearly flagged as not production-ready.

## Definition of done for each change
Code + relevant docs updated; typecheck/build/tests run (or explained why not); no accidental extra work; clear manual verification step.
