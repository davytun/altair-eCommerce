# Live ERP Service Flow

The live endpoint implementations are intentionally visible in source but not connected to `App.tsx` yet:

- `src/services/orders.ts`
- `src/services/abandonment.ts`

## Order creation flow

```text
OrderForm validation
  -> KnownOrderDraft (form values + full landing URL + stable session ID)
  -> ERP-approved request serializer supplies exact body and headers
  -> createOrder() POSTs to /api/orders/create
  -> HTTP 201 + body.success === true + valid body.data
       -> { kind: 'created', order }
       -> future: one Meta Purchase attempt, then validated thank-you redirect
  -> HTTP 202 -> { kind: 'queued' }, with no Purchase
  -> other HTTP / malformed body / network failure -> safe non-success result
```

`createOrder()` does not guess whether the ERP expects a flat JSON object, an envelope, form data, or particular headers. The caller must pass an `ApprovedOrderHttpRequest` containing the confirmed `body` and `headers`.

The success parser validates the confirmed fields:

- `id`
- `order_number`
- `customer_name`
- `total` in NGN major units
- `thank_you_url`
- optional `recommended_products`

## Abandonment flow

```text
Form change or explicit offer selection
  -> 3-second debounce
  -> createAbandonmentPayload()
  -> captureAbandonment() POSTs to /api/public/abandonment
  -> failure returns false and never blocks ordering
```

The required envelope is implemented as `session_id`, `funnel_slug`, `page_url`, and `fields`. `createAbandonmentPayload()` requires a supplied `AbandonmentFieldAliases` object, because the ERP must choose one approved alias for each customer field. It adds `product_id` only after a real offer click.

## What is needed to enable it

Provide the ERP team’s approved outbound order example, including the exact JSON/form body and every header. Also confirm CORS, timeout/idempotency policy, abandonment aliases, and queued-order customer message. Then wire an approved serializer and headers into these services and replace the development mocks in `App.tsx`.
