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
        <p className="eyebrow">Questions and answers</p>
        <h2 id="faq-title" className="type-heading mt-3">Practical details, clearly answered.</h2>
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
