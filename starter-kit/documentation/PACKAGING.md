# Packaging Automation

## Commands

```sh
npm run build
npm run prepare:php
npm run package
```

`npm run package` runs the first two commands and creates `artifacts/<product-slug>.zip`.

## Preconditions

Packaging intentionally stops unless all of the following are true:

1. `templates/store-tracking-head.php` exists and contains the exact company-approved PHP source.
2. The template passes `php -l` when a PHP CLI is available.
3. Vite has produced `dist/index.html` using `base: './'`.
4. The product configuration no longer has `isPlaceholder: true`.
5. Generated JavaScript and CSS exist in `dist/assets`.

## Output guarantees

The PHP preparation step injects the template into the final `<head>`, writes `dist/index.php`, and removes `dist/index.html`. The ZIP writer archives the **contents** of `dist` at its root and rejects source files, environment files, and dependencies.

The archive is not a proof that PHP executes or that the shared include resolves. Deploy to an approved PHP-enabled staging path and use `QA_CHECKLIST.md` before launch.
