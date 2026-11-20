export type ProductTheme = {
  accent: string
  accentForeground: string
  canvas: string
  ink: string
  muted: string
  surface: string
}

export type ProductIdentity = {
  name: string
  slug: string
}

export type ProductImage = {
  alt: string
  src: string
}

export type ProductBenefit = {
  description: string
  title: string
}

export type ProductDemoStep = {
  description: string
  image?: ProductImage
  title: string
}

export type ProductOrderStep = {
  description: string
  title: string
}

export type ProductVideo = {
  poster?: string
  src: string
  title: string
}

export type ProductTestimonial = {
  name: string
  quote: string
  source: string
}

export type ProductFaq = {
  answer: string
  question: string
}

export type ProductCta = {
  description?: string
  href: string
  label: string
  title: string
}

export type ProductContent = {
  benefits?: ProductBenefit[]
  cta?: ProductCta
  demoSteps?: ProductDemoStep[]
  description: string
  faqs?: ProductFaq[]
  headline: string
  included?: string[]
  orderSteps?: ProductOrderStep[]
  testimonials?: ProductTestimonial[]
  video?: ProductVideo
}

export type ProductMedia = {
  gallery: ProductImage[]
  hero?: ProductImage
}

export type ProductOfferPrice = {
  display: string
  originalDisplay?: string
  note?: string
}

export type ProductOffer = {
  contents: string
  id: number
  label: string
  price: ProductOfferPrice
  status: 'placeholder' | 'approved'
}

export const productSectionKeys = [
  'gallery',
  'benefits',
  'demonstration',
  'video',
  'testimonials',
  'faq',
  'cta',
  'orderForm',
] as const

export type ProductSectionKey = (typeof productSectionKeys)[number]

export type ProductSectionVisibility = Record<ProductSectionKey, boolean>

export type ProductConfig = {
  content: ProductContent
  identity: ProductIdentity
  isDemoContent?: boolean
  isPlaceholder: boolean
  media: ProductMedia
  offers: ProductOffer[]
  sections: ProductSectionVisibility
  theme: ProductTheme
}
