import type { ProductTestimonial } from '../../types/product'
import { Section } from '../layout/Section'

type TestimonialsProps = {
  testimonials: ProductTestimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <Section tone="surface" aria-labelledby="testimonials-title">
      <div className="max-w-5xl">
        <p className="eyebrow">Customer feedback</p>
        <h2 id="testimonials-title" className="type-heading mt-3">Words from verified customers.</h2>
        <div className="testimonial-list mt-8">
          {testimonials.map((testimonial) => (
            <figure className="testimonial" key={`${testimonial.name}-${testimonial.source}`}>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}
