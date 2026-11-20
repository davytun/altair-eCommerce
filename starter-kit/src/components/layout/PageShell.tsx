import type { PropsWithChildren } from 'react'
import { Container } from './Container'

type PageShellProps = PropsWithChildren<{
  productName: string
  productSlug: string
}>

export function PageShell({ children, productName, productSlug }: PageShellProps) {
  return (
    <div className="min-h-svh bg-[var(--page-canvas)] text-[var(--page-ink)]">
      <a className="skip-link" href="#main-content">Skip to page content</a>
      <header className="sales-header">
        <Container className="sales-header-inner">
          <span className="sales-brand">UCAGA</span>
          <span className="sales-product-label">{productName} / {productSlug}</span>
        </Container>
        <div className="sales-offer-strip">Demo sales page • Complete landing-page flow • No live orders</div>
      </header>
      {children}
    </div>
  )
}
