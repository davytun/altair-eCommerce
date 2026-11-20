import type { PropsWithChildren } from 'react'
import { Container } from './Container'

type PageShellProps = PropsWithChildren<{
  productName: string
  productSlug: string
}>

export function PageShell({ children, productName, productSlug }: PageShellProps) {
  return (
    <div className="min-h-svh bg-[var(--page-canvas)] text-[var(--page-ink)]">
      <a className="skip-link" href="#main-content">
        Skip to page content
      </a>
      <header className="border-b border-black/10 bg-[var(--page-canvas)]">
        <Container className="flex min-h-14 items-center justify-between gap-4 py-3">
          <span className="text-sm font-black tracking-tight">FlexShop</span>
          <span className="max-w-[55%] truncate text-right text-xs font-semibold text-[var(--page-muted)]">
            {productName} · {productSlug}
          </span>
        </Container>
      </header>
      {children}
    </div>
  )
}
