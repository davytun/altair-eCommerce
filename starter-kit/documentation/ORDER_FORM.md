# Order Form UI

## Scope

`OrderForm` and `OfferSelector` provide the reusable client-side order interface. They do not call an API, send abandonment data, fire analytics, or create orders by themselves.

## Fields

| Field | Required | UI behavior |
| --- | --- | --- |
| `product_id` | Yes | Selected only through an explicit offer click. |
| `customer_name` | Yes | Must contain a non-empty name. |
| `mobile_number` | Yes | Must contain a non-empty phone number. |
| `home_address` | Yes | Must contain a non-empty delivery address. |
| `delivery_state` | Yes | Must contain a non-empty state. |
| `email_address` | No | If supplied, must be a valid email-shaped value. |
| `whatsapp_number` | No | Optional contact number. |

The component does not add `landing_page_url` or `session_id`, because their exact order request placement remains unconfirmed by the ERP team.

## States

- Invalid local input displays field-level, screen-reader-visible errors and prevents submission.
- A supplied asynchronous `onSubmit` handler enables the loading state, disables the submit button, and catches unexpected errors with a generic retry message.
- Without an `onSubmit` handler, a valid form explicitly says that order submission is not configured. No network request is made.

## Integration boundary

The eventual ERP adapter must confirm the JSON envelope, headers, CORS, placement of `session_id`, error format, duplicate protection, and HTTP 202 behavior. Wire it through the `onSubmit` prop only after these items are approved.

Do not log, place in URLs, or include customer details in analytics events.
