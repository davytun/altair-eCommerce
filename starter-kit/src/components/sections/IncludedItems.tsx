import { Section } from '../layout/Section'

type IncludedItemsProps = {
  items: string[]
}

export function IncludedItems({ items }: IncludedItemsProps) {
  if (items.length === 0) return null

  return (
    <Section className="included-section" aria-labelledby="included-title">
      <div className="sales-title-bar">
        <h2 id="included-title">What is inside your demo order?</h2>
      </div>
      <ul className="included-list">
        {items.map((item) => (
          <li key={item}>
            <span aria-hidden="true">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
