# Tracking Implementation Status

## Implemented guardrails

`src/services/tracking.ts` exports `trackConfirmedPurchase()` for the future verified order adapter. It:

- Is inactive unless `VITE_APP_ENV=production` and `VITE_ENABLE_PRODUCTION_TRACKING=true`.
- Fires no PageView.
- Accepts only a confirmed order ID and ERP total supplied by the eventual HTTP 201 plus `success: true` response path.
- Uses `eventID = erp_meta_purchase_<id>`.
- Treats `total` as NGN major units and never multiplies or divides by 100.
- Makes at most one browser Purchase attempt for an order ID during a page load.
- Does not run for development mocks, queued orders, validation failures, or errors.

The helper is not yet invoked because no verified ERP adapter exists. It must be called only after that adapter verifies HTTP 201 and `body.success === true`.

## Intentionally not integrated

- The company PHP tracking include: canonical source and verified host path are not available. See `templates/README.md`.
- Redirect to `thank_you_url`: approved HTTPS destination hosts are not available.
- Microsoft tracking: no vendor, script, or approved event requirements have been supplied.
- Meta CAPI `test_event_code`: this belongs to the authorized server-side sender and is never bundled in the client.

## Safe rollout sequence

1. Obtain the clean PHP source and validate it with `php -l`.
2. Implement the approved ERP HTTP adapter and confirm status, body, CORS, and error behavior.
3. Obtain written approval for staging tracking, a safe order process, and approved thank-you hosts.
4. Add the PHP source only through the packaging task and verify one deployed PageView.
5. Call `trackConfirmedPurchase()` only for a real confirmed order in the approved production environment.
