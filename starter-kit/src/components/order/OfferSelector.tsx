import type { ProductOffer } from '../../types/product'

type OfferSelectorProps = {
  error?: string
  offers: ProductOffer[]
  onChange: (offerId: number) => void
  value: number | null
}

export function OfferSelector({ error, offers, onChange, value }: OfferSelectorProps) {
  return (
    <fieldset aria-describedby={error ? 'product-id-error' : undefined} className="offer-fieldset">
      <legend className="field-label">Choose your offer <span aria-hidden="true">*</span></legend>
      <div className="offer-list">
        {offers.map((offer) => (
          <label className="offer-option" key={offer.id}>
            <input
              checked={value === offer.id}
              name="product_id"
              onChange={() => onChange(offer.id)}
              type="radio"
              value={offer.id}
            />
            <span className="offer-option-body">
              <span>
                <strong>{offer.label}</strong>
                <small>{offer.contents}</small>
              </span>
              <span className="offer-price">
                {offer.price.originalDisplay && <del>{offer.price.originalDisplay}</del>}
                <strong>{offer.price.display}</strong>
                {offer.price.note && <small>{offer.price.note}</small>}
              </span>
            </span>
          </label>
        ))}
      </div>
      {error && <p className="field-error" id="product-id-error" role="alert">{error}</p>}
    </fieldset>
  )
}
