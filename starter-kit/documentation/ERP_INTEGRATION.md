# ERP Integration Contract and Implementation Rules

**Source:** company-provided integration notes, copied into the project discussion. **Caution:** endpoint availability, CORS, headers and request envelope have **not** been independently verified.

## A. Order creation
`POST https://erp.flexshop.ng/api/orders/create`

The ERP lists these order fields:

| Field | Required? | Note |
|---|---|---|
| `customer_name` | Yes | Customer name |
| `product_id` | Yes | Selected offer's approved ERP ID |
| `mobile_number` | Yes | Customer phone |
| `home_address` | Yes | Delivery address |
| `delivery_state` | Yes | Delivery state |
| `email_address` | No | Optional |
| `whatsapp_number` | No | Optional |
| `landing_page_url` | Page URL | Preserve full URL including query string |
| `session_id` | Needed for reconciliation | Same ID as abandonment, exact placement to confirm |

**Do not assume** the JSON request is a flat object until the ERP confirms the precise HTTP request contract (headers/content type/field nesting). Validation and API errors must be mapped from real responses.

### Successful order (HTTP 201)
Require `response.status === 201` **and** `body.success === true`; use `body.data`:
- `id`: number; browser Meta `eventID = erp_meta_purchase_<id>`.
- `total`: amount in NGN major units, **not kobo**.
- `order_number`: public order reference.
- `customer_name`: display name.
- `thank_you_url`: approved full URL used after successful creation.
- `recommended_products`: optional post-success offers supplied by ERP; don't override destination without approval.

Success ordering: process response → fire exactly one Meta Purchase attempt (if `fbq` loaded and `id` present) → redirect to validated `thank_you_url` or show approved fallback success UI. Avoid firing Purchase twice on React re-renders.

### Queued response (HTTP 202)
No browser Purchase event; do not manufacture `id` or `total`. ERP's exact queued UI and redirect behavior is **pending**.

### Error cases
Invalid form data, non-2xx responses, network failures and malformed JSON must not be shown as success. Offer retry, but investigate idempotency semantics to avoid accidental duplicate orders after timeout.

## B. Abandonment
`POST https://erp.flexshop.ng/api/public/abandonment`

Required on **every** request:
```json
{
  "session_id": "<stable-session-uuid>",
  "funnel_slug": "<configured-product-slug>",
  "page_url": "<window.location.href>",
  "fields": {}
}
```
Optional supported entries in `fields`: `phone` or `mobile_number`; `name` or `customer_name` or `full_name`; `email` or `email_address`; `address` or `home_address`; `whatsapp_number`. **Use one consistent alias for each;** get confirmed preference from ERP. `product_id` only **after the user clicks/selects an offer**.

- Debounce input updates for **3 seconds** after typing stops; don't post unchanged payloads.
- Don't block order submit if abandonment fails.
- Preserve UTM parameters, `fbclid`, etc. in `page_url` and `landing_page_url`.
- Do not expose phone/address in analytics events, URLs, browser logs or error trackers.
- Reuse the same `session_id` in order creation so ERP can clear abandonment state.

### Example abandonment request
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
This is an **example**, not a production test request.

## C. Implementation gate
Before connecting a real page, confirm order request envelope, required headers, allowed CORS origins, error formats, HTTP 202 handling, ERP-side duplicate order safeguards, field aliases and approved QA/test environment.
