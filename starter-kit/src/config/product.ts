import type { ProductConfig } from '../types/product'

/**
 * Temporary demo content for reviewing the complete reusable sales page.
 * Replace this configuration with approved product content before launch.
 */
export const product: ProductConfig = {
  identity: {
    name: 'UCAGA Demo Product',
    slug: 'ucaga-demo',
  },
  content: {
    headline: 'A complete sales-page demo, ready for your real product details.',
    description:
      'This is temporary demonstration content so you can inspect the full landing-page flow. Replace it with approved UCAGA product information before any customer-facing launch.',
    benefits: [
      {
        title: 'Clear product story',
        description: 'Show a concise explanation of the product, its use, and its approved customer benefit.',
      },
      {
        title: 'Flexible offer display',
        description: 'Present single and bundle offers in one reusable, responsive ordering flow.',
      },
      {
        title: 'Delivery-first checkout',
        description: 'Collect customer delivery details without showing unverified payment or delivery promises.',
      },
    ],
    demoSteps: [
      {
        title: 'Show the product clearly',
        description: 'Replace this step with an approved product image or video demonstration.',
      },
      {
        title: 'Explain the practical use',
        description: 'Use approved instructions to show how the real product fits into a customer routine.',
      },
      {
        title: 'Set accurate expectations',
        description: 'Describe only the checked result, delivery terms, and contents of the actual offer.',
      },
    ],
    faqs: [
      {
        question: 'Is this page ready to receive live customer orders?',
        answer: 'No. This demo uses local mocks and temporary content. The approved ERP request contract and real product information are required before launch.',
      },
      {
        question: 'What should be replaced before publishing?',
        answer: 'Replace the demo wording, offer prices, product media, product facts, support details, delivery terms, and FAQ answers with approved information.',
      },
    ],
    cta: {
      title: 'Inspect the order flow',
      description: 'Choose a demo offer and view the reusable delivery-details form below.',
      label: 'View demo order form',
      href: '#order-form',
    },
  },
  media: {
    gallery: [],
  },
  offers: [
    {
      id: 1,
      label: 'Demo single offer',
      price: {
        display: '₦0.00',
        note: 'Demo only, not a live offer',
      },
      contents: 'Temporary sample offer for reviewing form layout and validation.',
      status: 'placeholder',
    },
  ],
  sections: {
    gallery: true,
    benefits: true,
    demonstration: true,
    video: true,
    testimonials: false,
    faq: true,
    cta: true,
    orderForm: true,
  },
  theme: {
    accent: 'oklch(0.52 0.19 25)',
    accentForeground: 'oklch(0.99 0.005 75)',
    canvas: 'oklch(0.98 0.007 80)',
    ink: 'oklch(0.18 0.008 70)',
    muted: 'oklch(0.5 0.012 70)',
    surface: 'oklch(0.95 0.035 80)',
  },
  isDemoContent: true,
  isPlaceholder: false,
}
