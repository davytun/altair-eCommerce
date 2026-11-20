import { useState } from 'react'
import type { ProductImage } from '../../types/product'
import { Section } from '../layout/Section'

type ProductGalleryProps = {
  images: ProductImage[]
  showMediaPlaceholder?: boolean
  title?: string
}

export function ProductGallery({ images, showMediaPlaceholder = false, title = 'See the product' }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (images.length === 0 && !showMediaPlaceholder) {
    return null
  }

  const selectedImage = images[selectedIndex]

  return (
    <Section aria-labelledby="gallery-title">
      <div className="max-w-5xl">
        <p className="eyebrow">Product gallery</p>
        <h2 id="gallery-title" className="type-heading mt-3">{title}</h2>
        <div className="gallery-layout mt-8">
          {selectedImage ? (
            <img className="gallery-feature" alt={selectedImage.alt} src={selectedImage.src} />
          ) : (
            <div className="gallery-placeholder" role="img" aria-label="Approved product gallery images required">
              <span>Approved gallery images</span>
              <small>Use real product images with descriptive alt text.</small>
            </div>
          )}
          {images.length > 1 && (
            <div className="gallery-thumbnails" aria-label="Product images">
              {images.map((image, index) => (
                <button
                  aria-label={`View image ${index + 1}: ${image.alt}`}
                  aria-pressed={index === selectedIndex}
                  className="gallery-thumbnail"
                  key={image.src}
                  onClick={() => setSelectedIndex(index)}
                  type="button"
                >
                  <img alt="" src={image.src} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
