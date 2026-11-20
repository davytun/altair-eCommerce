# Incremental Development Plan

**Rule:** implement and verify **one task at a time**. Do not request an agent to build all phases at once. Each task is separately reviewable.

## Milestone A — foundation
- [x] **A1** Initialize Vite + React + TypeScript + Tailwind and confirm local run.
  - Done when the example app starts; `tsc` and `vite build` pass.
- [x] **A2** Add typed product config and an example with placeholder content clearly labeled.
  - Done when changing config updates product name, headline, colours and approved offer IDs in UI.
- [x] **A3** Create base responsive tokens, typography and accessible layout shell.
  - Done when mobile + desktop layout remain usable.

## Milestone B — first sales page
- [ ] **B1** Add hero and gallery.
- [ ] **B2** Add benefits/how-it-works and optional video.
- [ ] **B3** Add configurable offer selection and form UI (no live submission).
- [ ] **B4** Add form validation and visible loading/error states.

## Milestone C — ERP (requires approved contract)
- [ ] **C1** Define typed ERP request/response adapters from verified examples.
- [ ] **C2** Implement order creation and 201/202/error handling with mocked HTTP first.
- [ ] **C3** Implement stable session ID and 3s debounced abandonment calls.
- [ ] **C4** Verify same session ID on both endpoints and product ID only after click.

## Milestone D — tracking and packaging
- [ ] **D1** Add exact approved PHP head template and compile `index.php` automatically.
- [ ] **D2** Add Meta Purchase service and once-per-order guard; verify against mocked 201/202 results.
- [ ] **D3** Add approved Microsoft script only once supplier confirms vendor/code.
- [ ] **D4** Add ZIP packaging and contents validation.
- [ ] **D5** Test nested cPanel path, PHP include, real browser tracking and approved ERP test order.

## Milestone E — repeatability
- [ ] **E1** Duplicate page brief for product 2, switch config/media, don't alter shared services.
- [ ] **E2** Time the full product-to-ZIP workflow; address true bottlenecks.
- [ ] **E3** Repeat for 5–10 products when proven reliable.

## Per-task delivery note format
**Task:**
**Files touched:**
**Decisions:**
**Tests run/results:**
**What is still unverified:**
**Next recommended single task:**
