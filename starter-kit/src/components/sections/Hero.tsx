import type { ProductCta, ProductImage } from '../../types/product'
import { Container } from '../layout/Container'

type HeroProps = {
  cta?: ProductCta
  description: string
  headline: string
  image?: ProductImage
  name: string
  showMediaPlaceholder?: boolean
}

export function Hero({ cta, description, headline, image, name, showMediaPlaceholder = false }: HeroProps) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{name}</p>
          <h1 id="hero-title" className="type-display mt-4">{headline}</h1>
          <p className="type-lead mt-5">{description}</p>
          {cta && (
            <a className="button-base button-primary mt-8" href={cta.href}>
              {cta.label}
            </a>
          )}
        </div>
        {(image || showMediaPlaceholder) && (
          <div className="hero-media">
            {image ? (
              <img alt={image.alt} src={image.src} />
            ) : (
              <div className="media-placeholder" role="img" aria-label="Approved hero product image required">
                <span>Approved hero image</span>
                <small>Add real, licensed product media before publishing.</small>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}
