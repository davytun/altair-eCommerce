import type { ProductDemoStep } from '../../types/product'
import { Section } from '../layout/Section'

type DemonstrationProps = {
  steps: ProductDemoStep[]
  title?: string
}

export function Demonstration({ steps, title = 'How it works' }: DemonstrationProps) {
  if (steps.length === 0) {
    return null
  }

  return (
    <Section aria-labelledby="demonstration-title">
      <div className="max-w-5xl">
        <p className="eyebrow">Demonstration</p>
        <h2 id="demonstration-title" className="type-heading mt-3">{title}</h2>
        <ol className="demo-list mt-8">
          {steps.map((step, index) => (
            <li key={step.title}>
              <div className="demo-copy">
                <span className="benefit-index">Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {step.image && (
                <img alt={step.image.alt} className="demo-image" loading="lazy" src={step.image.src} />
              )}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
