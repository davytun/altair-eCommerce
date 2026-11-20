import type { ProductFaq } from '../../types/product'
import { Section } from '../layout/Section'

type FaqProps = {
  faqs: ProductFaq[]
}

export function Faq({ faqs }: FaqProps) {
  if (faqs.length === 0) {
    return null
  }

  return (
    <Section aria-labelledby="faq-title">
      <div className="max-w-4xl">
        <div className="sales-title-bar">
          <h2 id="faq-title">Frequently asked questions</h2>
        </div>
        <div className="faq-list mt-8">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
