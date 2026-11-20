# Mock ERP Flow

## Current mode

The application uses local mocks only when `VITE_APP_ENV=development`. The mocks never call `fetch`, never create an ERP order, never send abandonment data, never write customer data to browser storage, and never fire Meta events.

Staging and production receive no order or abandonment handler from `App.tsx`, so the form remains disconnected until an approved adapter is supplied.

## Session and draft behavior

- `usePageSessionId` creates one UUID per configured product slug in `sessionStorage` and reuses it through the browser tab session.
- `useAbandonmentDraft` receives local form changes and waits exactly 3 seconds after the latest change.
- It skips empty drafts and does not resend the same successfully captured draft.
- The selected `product_id` is available only after the visitor explicitly clicks an offer.
- The full `window.location.href` is captured at queue or submit time, preserving campaign query parameters.
- Any abandonment failure is ignored so it cannot block order submission.

## Order handling

`OrderForm` validates local fields before it invokes an optional asynchronous handler. In development, the mock handler briefly enters a loading state and returns a clear mock completion message. It does not imply that a customer order was placed.

No Meta Purchase, redirect, thank-you URL handling, or HTTP 202 customer flow occurs in mock mode.

## Required production gate

Do not replace the mocks with a browser HTTP client until the ERP team confirms:

1. Exact request JSON envelope and content-type/headers.
2. Where `session_id` belongs in the order request.
3. Allowed landing-page origins and CORS behavior, or the approved proxy.
4. The required abandonment field aliases.
5. Error response format and timeout/idempotency behavior.
6. Customer messaging and redirect behavior for HTTP 202.
7. Sandbox endpoint or authorized safe test-order procedure.
8. Approved HTTPS thank-you destinations and production tracking approval.
