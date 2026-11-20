# Sales Section Components

## Purpose

`src/components/sections/` contains reusable, config-driven sales-page sections. Every section is optional. When its associated configuration is absent or empty, it returns no markup.

## Available sections

| Component | Configuration | Notes |
| --- | --- | --- |
| `Hero` | `name`, `headline`, `description`, optional `heroImage` and `cta` | Renders a real image only when one is supplied. |
| `ProductGallery` | `images` | Selectable gallery with native buttons and meaningful image alt text. |
| `Benefits` | `benefits` | Use only real, verifiable outcomes. |
| `Demonstration` | `demoSteps` | Supports up to the product's approved demonstration steps and optional real step images. |
| `VideoDemo` | `video` | Uses native controls and metadata preload. It never autoplays. |
| `Testimonials` | `testimonials` | Requires the customer's name, exact approved quotation, and a source. |
| `Faq` | `faqs` | Uses native disclosure controls for keyboard access. |
| `CtaSection` | `cta` | Uses an approved in-page or destination URL and an approved CTA label. |

## Product configuration

Add approved content to `src/config/product.ts`, under the `content` and `media` groups. The relevant types are exported from `src/types/product.ts`.

```ts
media: {
  hero: {
    src: '/images/product-front.webp',
    alt: 'Product shown from the front on a table',
  },
  gallery: [],
},
content: {
  benefits: [
    {
      title: 'Approved benefit title',
      description: 'Approved, verifiable supporting explanation.',
    },
  ],
},
```

Do not use example values as publishable copy. Before enabling any section, complete the matching information in `PRODUCT_PAGE_TEMPLATE.md` and obtain approval for claims, offer IDs, prices, media rights, testimonials, and answers.

## Boundaries

These components do not submit forms, select offers, create orders, record abandonment, fire tracking events, or assume an ERP contract. Those responsibilities remain future, separate tasks.
