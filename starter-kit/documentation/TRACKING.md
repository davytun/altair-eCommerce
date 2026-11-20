# Tracking and Analytics Specification

## 1. Company PHP tracking include
The company provided a PHP snippet that climbs parent directories (up to 8 iterations), locates `includes/store-tracking.php`, includes it and prints `store_tracking_head()`. When missing, it emits a `dead_store_tracking` placeholder.

**Critical:** Put PHP in generated **`index.php`**, inside `<head>`, **not** in `.tsx`, and execute it on PHP-capable hosting. The packaging script should read the exact **clean PHP source supplied by the company** from a versioned template. The snippet pasted into chat included escape/HTML artifacts and must be validated before shipping (e.g. `php -l`). This documentation does not fabricate a corrected canonical file.

### Staging validation
- View rendered HTML: tracking script appears **once** and `dead_store_tracking` does not appear.
- Confirm `includes/store-tracking.php` resolves from the final upload path and `store_tracking_head()` exists.
- Verify exactly one initial Meta PageView; the company's include is expected to supply it.
- Confirm no private secrets are bundled into the delivered JS/ZIP.

## 2. Meta Purchase
Only on `HTTP 201 && body.success === true` from order create. Extract `body.data`.

```ts
const order = body.data;
if (typeof window.fbq === 'function' && order?.id) {
  const amount = typeof order.total === 'number'
    ? order.total
    : Number(String(order.total ?? '').replace(/[^\d.]/g, ''));
  window.fbq('track', 'Purchase', {
    value: Number.isFinite(amount) && amount > 0 ? amount : 0,
    currency: 'NGN',
  }, { eventID: `erp_meta_purchase_${order.id}` });
}
```

- `total` is already in **naira** (e.g. `29900`), not kobo; no ×100 or ÷100.
- Exact `eventID` prefix must match server-side CAPI deduplication.
- Never fire Purchase on `202`, form validation failure, API failure or retry without a newly confirmed order.
- Ensure a success response triggers at most one browser Purchase attempt per order within that page load.
- The pasted original had an escaping typo (`/[^d.]/g`); the correct JavaScript regex is `/[^\d.]/g`.
- Validate thank-you redirect host against company-approved HTTPS domains; do not use an arbitrary response URL.

## 3. Meta testing vs production — mandatory safeguards

**Company context:** The shared Meta Pixel is already live. Do **not** generate synthetic Purchase events on it or submit fake orders to the production ERP to test a landing page.

### What the MD may have meant
Meta **Test Events** provides a `test_event_code` for checking **server-side Conversions API (CAPI)** requests. Retrieve it in Meta Events Manager → select the correct data source → Test Events. A typical code is an alphanumeric value; the exact value must come from the company's Meta account. The backend/CAPI sender includes `test_event_code` as a **top-level parameter** in its Meta CAPI request, only for authorized tests. It is **not** the Pixel ID, access token, ERP `product_id`, or an arbitrary suffix to append to the React page URL. Do **not** guess a code or add it to an ERP order POST unless the ERP team explicitly documents support. The ERP controls server-side CAPI, so coordinate with its owner.

For **browser Pixel events**, open the test page using Events Manager's **Test Events → browser/website** flow, which shows browser events; this does **not** guarantee that real analytics processing is suspended. A URL query parameter alone will not safely isolate browser and server events unless the company's tracking system explicitly implements such a switch.

### Required environment protections
- **Local development:** Tracking **off by default**. Never load the company's shared live PHP tracking include during normal local development; never call `fbq('track', 'Purchase', ...)` in development. Use mocks/test doubles for the ERP order endpoint and verify event payload logic in automated tests without sending real analytics events.
- **Staging / integration tests:** Obtain written approval for a dedicated test Pixel/dataset or other company-approved isolated test setup. Request an ERP sandbox endpoint or approved safe test-order mechanism. If only production infrastructure exists, avoid synthetic end-to-end purchase tests until the ERP/marketing owners approve a controlled method.
- **Production:** Use the exact approved `includes/store-tracking.php` include without rewriting IDs, security settings, or event names. On a real HTTP 201 + `success: true` order, fire one Purchase with deduplication `eventID = erp_meta_purchase_<order.id>` and NGN amount from `order.total`.
- **Configuration:** Make environment explicit (`development` / `staging` / `production`), and make *production tracking opt-in at build/deployment time*. Never use a client-side query string or localStorage toggle to bypass approved environment checks. Keep any CAPI access token server-side; never bundle credentials in Vite client assets.
- **Testing approval:** Record who authorized the test, which environment, which Pixel/dataset, which ERP endpoint, and how test entries are identified/cleaned up.
- **Test-event caveat:** Meta's Test Events mechanism is for verification, not a guarantee that events will be excluded from all reporting, optimization, or measurement. Use isolated test infrastructure if production reporting must remain untouched.

### Blockers to resolve with the MD / ERP owner
1. Is the number a Meta `test_event_code`? Request its exact source and intended use (no need to put private access tokens in this repo).
2. Does the company offer a test Pixel/dataset, and does `store-tracking.php` support a staging mode?
3. Does the ERP expose a sandbox order intake or documented test-order procedure?
4. Who controls server-side CAPI and can attach `test_event_code` to test requests?

## 4. Microsoft tracking
Vendor/product is **not confirmed** (could be Clarity, UET, or something else). Do not auto-install, invent event tags, or duplicate a script that the PHP include might already load. Obtain exact code and expected behavior.

## 5. Privacy, consent and correctness
Only pass required customer fields to ERP. Avoid shipping sensitive PII to pixels or browser loggers. Follow company privacy/consent requirements before enabling analytics, and verify deployed tracking in the browser plus company analytics dashboard.
