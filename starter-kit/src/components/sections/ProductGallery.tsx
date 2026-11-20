import type { ProductImage } from '../../types/product'
import { Section } from '../layout/Section'

type ProductGalleryProps = {
  images: ProductImage[]
  showMediaPlaceholder?: boolean
  title?: string
}

export function ProductGallery({ images, showMediaPlaceholder = false, title = 'See it in real spaces' }: ProductGalleryProps) {
  if (images.length === 0 && !showMediaPlaceholder) return null

  return (
    <Section className="sales-gallery-section" aria-labelledby="gallery-title">
      <div className="sales-title-bar">
        <h2 id="gallery-title">{title}</h2>
      </div>
      {images.length > 0 ? (
        <div className="sales-image-stack">
          {images.map((image, index) => (
            <figure className={index === 0 ? 'sales-image-feature' : 'sales-image-tile'} key={`${image.src}-${index}`}>
              <img alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} src={image.src} />
            </figure>
          ))}
        </div>
      ) : (
        <div className="gallery-placeholder" role="img" aria-label="Approved product gallery images required">
          <span>Approved gallery images</span>
          <small>Use real product images with descriptive alt text.</small>
        </div>
      )}
      <div className="sales-center-action">
        <a className="sales-cta" href="#order-form">Yes, I want to choose a package</a>
      </div>
    </Section>
  )
}
