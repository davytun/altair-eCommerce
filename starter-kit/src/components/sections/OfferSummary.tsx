import type { ProductOffer } from '../../types/product'
import { Section } from '../layout/Section'

type OfferSummaryProps = {
  offers: ProductOffer[]
}

export function OfferSummary({ offers }: OfferSummaryProps) {
  if (offers.length === 0) return null

  return (
    <Section className="offer-summary-section" aria-labelledby="offer-summary-title">
      <div className="offer-summary-shell">
        <div className="sales-section-heading">
          <span>Demo package selection</span>
          <h2 id="offer-summary-title">Choose the layout you want to review</h2>
          <p>All prices and package details below are temporary demonstration content.</p>
        </div>
        <div className="offer-summary-list">
          {offers.map((offer) => (
            <article className="offer-summary-row" key={offer.id}>
              <div>
                <h3>{offer.label}</h3>
                <p>{offer.contents}</p>
              </div>
              <div className="offer-summary-price">
                {offer.price.originalDisplay && <del>{offer.price.originalDisplay}</del>}
                <strong>{offer.price.display}</strong>
                {offer.price.note && <small>{offer.price.note}</small>}
              </div>
            </article>
          ))}
        </div>
        <a className="sales-cta" href="#order-form">Review the order form</a>
      </div>
    </Section>
  )
}
