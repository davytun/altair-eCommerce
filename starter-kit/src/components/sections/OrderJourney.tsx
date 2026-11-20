import type { ProductOrderStep } from '../../types/product'
import { Section } from '../layout/Section'

type OrderJourneyProps = {
  steps: ProductOrderStep[]
}

export function OrderJourney({ steps }: OrderJourneyProps) {
  if (steps.length === 0) return null

  return (
    <Section className="order-journey-section" tone="surface" aria-labelledby="order-journey-title">
      <div className="sales-title-bar">
        <h2 id="order-journey-title">How the order flow works</h2>
      </div>
      <ol className="order-journey-list">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="journey-number" aria-hidden="true">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="sales-center-action">
        <a className="sales-cta" href="#order-form">Choose a demo package</a>
      </div>
    </Section>
  )
}
