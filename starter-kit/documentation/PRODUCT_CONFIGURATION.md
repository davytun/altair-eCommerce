# Product Configuration System

Every product page is configured in `src/config/product.ts`. It is typed as `ProductConfig`, so missing required groups and invalid section keys fail the typecheck.

## Configuration shape

| Group | Controls |
| --- | --- |
| `identity` | Product name and funnel/page slug |
| `content` | Headline, description, benefits, demonstrations, video, testimonials, FAQ, and CTA copy |
| `media` | Hero image and gallery images, with required meaningful alt text |
| `offers` | Approved ERP offer ID, label, package contents, and displayed price |
| `sections` | Visibility of gallery, benefits, demonstration, video, testimonials, FAQ, CTA, and order form |
| `theme` | Semantic canvas, surface, ink, muted, accent, and accent-foreground colors |

## Offer prices

Each offer uses the following structure:

```ts
{
  id: 42,
  label: 'One set',
  price: {
    display: '₦29,900',
    originalDisplay: '₦35,000',
    note: 'Approved delivery note',
  },
  contents: 'Approved offer contents',
  status: 'approved',
}
```

`id` must be the ERP-approved offer/product ID. `price.display` is UI copy only. On a confirmed order, the ERP response remains the authority for the order total and later Meta Purchase value.

## Section visibility

Set a section to `false` when that product has no approved content for it:

```ts
sections: {
  gallery: true,
  benefits: true,
  demonstration: false,
  video: false,
  testimonials: false,
  faq: true,
  cta: true,
  orderForm: true,
}
```

Visibility does not manufacture content. A visible section still renders nothing when its content is absent, which prevents blank shells and unsupported sales copy.

## Publishing checklist

1. Complete the matching brief in `PRODUCT_PAGE_TEMPLATE.md`.
2. Replace every placeholder value and set `isPlaceholder` to `false` only after approval.
3. Use approved media with descriptive alt text and licensed sources.
4. Confirm each offer ID, display price, and status with the product owner.
5. Run `npm run lint` and `npm run build`.

## Development preview

While `isPlaceholder` is `true`, the landing page deliberately renders every reusable section with clearly labeled placeholder copy and media frames. This makes the complete page and component inventory visible during development without inventing product claims, customer feedback, images, prices, or videos.

Before publishing, replace each placeholder with approved material and set `isPlaceholder` to `false`. Empty optional sections then render nothing.

No browser-visible environment variable should contain credentials, tracking secrets, or ERP private keys.
