import type { ProductBenefit } from '../../types/product'
import { Section } from '../layout/Section'

type BenefitsProps = {
  benefits: ProductBenefit[]
  title?: string
}

export function Benefits({ benefits, title = "Why you'll love this diffuser" }: BenefitsProps) {
  if (benefits.length === 0) {
    return null
  }

  return (
    <Section tone="surface" aria-labelledby="benefits-title">
      <div className="max-w-4xl">
        <div className="sales-title-bar">
          <h2 id="benefits-title">{title}</h2>
        </div>
        <ul className="benefit-list mt-8">
          {benefits.map((benefit, index) => (
            <li key={benefit.title}>
              <span aria-hidden="true" className="benefit-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
