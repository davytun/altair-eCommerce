# UI Components and Design System

## Purpose

These primitives support clear, mobile-first single-product sales pages. They are deliberately presentational: they do not know about ERP requests, tracking, offers, or product claims.

## Theme tokens

`src/config/product.ts` supplies the per-product values below. Use semantic values rather than hard-coded campaign colors in components.

| Token | Use |
| --- | --- |
| `--page-canvas` | Default page background |
| `--page-surface` | Supporting section background |
| `--page-ink` | Main text and high-emphasis controls |
| `--page-muted` | Supporting copy |
| `--page-accent` | Main campaign action and short labels |
| `--page-accent-foreground` | Text on the accent action |

The shared neutral and focus tokens are in `src/index.css`. Before publishing a product, verify all configured foreground/background combinations meet WCAG 2.2 AA contrast.

## Layout

- `Container` constrains content to `content` (72rem) or `wide` (80rem).
- `Section` adds responsive vertical spacing and a `canvas`, `surface`, or `ink` tone.
- Use semantic landmarks and headings in the content supplied to `Section`; the primitive does not invent document structure.

## Actions and fields

- `Button` has `primary`, `secondary`, and `quiet` variants. Give every action a concrete approved label.
- `FormField` pairs a visible label with a control and can display a hint or error. The calling component owns validation and ARIA descriptions.
- `Input`, `Select`, and `Textarea` are styled native controls. They support normal native attributes such as `required`, `autoComplete`, `disabled`, and `aria-describedby`.
- Every control has a minimum 48px target and a visible focus treatment. Reduced-motion preferences disable nonessential transitions.

## Boundaries

Do not add sales claims, testimonials, countdowns, prices, offer IDs, ERP calls, tracking, or form submission behavior to these primitives. Keep those concerns in product configuration or the later dedicated integration tasks.
