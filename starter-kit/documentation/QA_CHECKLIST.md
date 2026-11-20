# Quality Assurance Checklist — Each Sales Page

## 1. Content and visual
- [ ] Headline makes clear what the product does in plain language.
- [ ] Product photos/videos are correct, legible and approved.
- [ ] Mobile layout works at narrow phone widths, tablet and desktop.
- [ ] Pricing/offer names match approved source; each ERP `product_id` is correct.
- [ ] CTAs focus/scroll to form; keyboard and screen-reader labels work.
- [ ] No fake urgency, reviews or unsupported claims.

## 2. Form
- [ ] Required: `customer_name`, `product_id`, `mobile_number`, `home_address`, `delivery_state`.
- [ ] Optional: `email_address`, `whatsapp_number`.
- [ ] Validation blocks invalid submissions with helpful field messages.
- [ ] Submit shows progress, disables concurrent submission and handles errors.
- [ ] No customer phone/address in URL, logs or analytics events.

## 3. Abandonment
- [ ] `session_id` stable in page session and is reused for order creation.
- [ ] `funnel_slug` correct for this page.
- [ ] `page_url` includes full query string and campaign parameters.
- [ ] Inputs debounce at 3 seconds and unchanged values aren't resent.
- [ ] `product_id` sent only **after** explicit offer click.
- [ ] Failure to track abandonment does not stop order creation.

## 4. ERP order
- [ ] Approved test method and approved order/request shape used.
- [ ] Correct headers, origin/CORS, payload fields and session ID.
- [ ] HTTP 201 + `success: true` uses `body.data`.
- [ ] HTTP 202 shows agreed pending UI and triggers **no Purchase**.
- [ ] 4xx, 5xx, malformed response and network failure do **not** claim success.
- [ ] Retry after timeout does not make unchecked duplicate live orders (verify ERP safeguards).
- [ ] Redirect only to approved HTTPS thank-you URL, else approved fallback.

## 5. Meta test safety (complete before any integration test)
- [ ] Test environment and approver recorded; no live analytics enabled in local development.
- [ ] No synthetic Purchase sent to the live Meta Pixel/dataset.
- [ ] No synthetic order sent to live ERP without explicit authorization and an approved test procedure.
- [ ] Browser Pixel test flow and server CAPI `test_event_code` are distinguished.
- [ ] `test_event_code` (if needed) is configured by the authorized server-side CAPI owner; it is **not** blindly appended to page URLs or ERP payloads.
- [ ] Exact production tracking include is loaded **only** on approved deployment.

## 6. Meta and other tracking
- [ ] Server executes PHP; `dead_store_tracking` absent on published page.
- [ ] Meta PageView not duplicated.
- [ ] Browser Meta Purchase fires **once per successful order** with `eventID = erp_meta_purchase_<id>`.
- [ ] Purchase `value` is numerical NGN major units; `currency` exactly `NGN`.
- [ ] Microsoft tracking matches actual supplied script, if applicable.
- [ ] Consent/privacy handling follows company policy.

## 7. Package and deployment
- [ ] ZIP root contains `index.php`, correct JS/CSS and referenced media.
- [ ] No `.env`, source TSX, Node dependencies or private credentials shipped.
- [ ] Nested cPanel path works; asset requests succeed.
- [ ] PHP snippet loaded exactly once and shared include resolves.
- [ ] Page tested on its real domain/subfolder, not just Vite preview.
- [ ] Backup/rollback ZIP retained by deployment owner.

## Evidence record
Product slug: ____  Date: ____  Reviewer: ____  Published URL: ____
Order test reference (safe/non-PII): ____  Notes/open defects: ____  Approved by: ____
