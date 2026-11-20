import type { ProductCta } from '../../types/product'
import { Section } from '../layout/Section'

type CtaSectionProps = {
  cta?: ProductCta
}

export function CtaSection({ cta }: CtaSectionProps) {
  if (!cta) {
    return null
  }

  return (
    <Section className="sales-cta-section" tone="ink" aria-labelledby="cta-title">
      <div className="sales-cta-panel">
        <p className="cta-overline">Demo call to action</p>
        <h2 id="cta-title" className="type-heading">{cta.title}</h2>
        {cta.description && <p className="type-lead mt-4 text-[var(--page-canvas)]">{cta.description}</p>}
        <a className="sales-cta mt-8" href={cta.href}>{cta.label}</a>
      </div>
    </Section>
  )
}
