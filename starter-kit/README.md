# FlexShop Sales Page Starter Kit

**Status:** Phase 1 foundation. Canonical requirements are in [documentation/PRD.md](documentation/PRD.md).

## Purpose

Create focused, single-product React sales pages that explain a product clearly and send approved orders to the FlexShop ERP. This is not a storefront, cart, payment system, CRM, or ERP replacement.

## Stack

React, Vite, TypeScript, and Tailwind CSS. The eventual deployment package will contain an `index.php` entry point and static assets for a PHP-capable host.

## Local development

```sh
npm install
npm run dev
```

Run `npm run lint` and `npm run build` before handoff. Vite uses `base: './'` so future deployment packages can live in a nested directory.

## Project conventions

- Configure one product's approved content, offer IDs, and theme in `src/config/product.ts`.
- Keep product content separate from future ERP, abandonment, tracking, and packaging services.
- `src/types/` contains typed contracts. `src/lib/` contains small framework-free helpers. `src/components/` contains UI only.
- All example product values are placeholders. Never publish unapproved offer IDs, prices, claims, or media.
- Copy `.env.example` to `.env.local` for local build metadata. Do not put credentials, tokens, or personal data in `VITE_*` variables because they are bundled into client code.
- Production tracking stays disabled by default. Its implementation is deferred until the company supplies an approved PHP template and host conditions.

## Documentation

Read the files in `documentation/` before working on a subsequent task. In particular, the PRD, integration notes, tracking specification, and open questions are authoritative.

Reusable visual primitives and their composition rules are documented in [documentation/UI_COMPONENTS.md](documentation/UI_COMPONENTS.md).

Reusable content sections and their configuration contracts are documented in [documentation/SALES_SECTIONS.md](documentation/SALES_SECTIONS.md).

The complete per-product configuration reference is in [documentation/PRODUCT_CONFIGURATION.md](documentation/PRODUCT_CONFIGURATION.md).

The local-only order form behavior and future integration boundary are in [documentation/ORDER_FORM.md](documentation/ORDER_FORM.md).

The development-only ERP mock, session, and abandonment behavior are in [documentation/MOCK_ERP_FLOW.md](documentation/MOCK_ERP_FLOW.md).

The real ERP service interfaces and their required activation contract are in [documentation/LIVE_ERP_FLOW.md](documentation/LIVE_ERP_FLOW.md).

Tracking safeguards, the Purchase helper, and unresolved integration gates are in [documentation/TRACKING_IMPLEMENTATION.md](documentation/TRACKING_IMPLEMENTATION.md).

Build-to-ZIP automation and its release gates are in [documentation/PACKAGING.md](documentation/PACKAGING.md).
