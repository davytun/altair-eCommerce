import bedroomImage from '../assets/demo-diffuser/bedroom.png'
import heroImage from '../assets/demo-diffuser/hero.png'
import wallMountImage from '../assets/demo-diffuser/wall-mount-v2.png'
import type { ProductConfig } from '../types/product'

/**
 * Product-specific demonstration content for reviewing the complete sales page.
 * Replace all copy, IDs, prices and media with approved content before launch.
 */
export const product: ProductConfig = {
  identity: {
    name: 'Rechargeable Aroma Diffuser',
    slug: 'ucaga-diffuser-demo',
  },
  content: {
    headline: 'Rechargeable aroma diffuser for bedrooms, offices and living spaces',
    description:
      'A compact demo product with soft ambient light, a visible fragrance reservoir and flexible desk or wall placement.',
    included: [
      '1 rechargeable diffuser unit',
      '1 demonstration fragrance bottle',
      '1 transparent wall bracket',
      '1 charging cable',
      '1 demonstration user guide',
    ],
    benefits: [
      {
        title: 'Rechargeable design',
        description: 'Place it where you need it without building the page around a permanent wall socket.',
      },
      {
        title: 'Visible fragrance reservoir',
        description: 'The clear centre makes the product and remaining liquid easy to see at a glance.',
      },
      {
        title: 'Desk or wall placement',
        description: 'Show the product standing on a surface or attached with the illustrated adhesive bracket.',
      },
    ],
    demoSteps: [
      {
        title: 'Use it in your everyday spaces',
        description: 'Bedroom, office and lounge imagery helps customers understand the size and visual effect.',
        image: {
          alt: 'Demo rechargeable diffuser glowing on a bedside table',
          src: bedroomImage,
        },
      },
      {
        title: 'Keep it on a table',
        description: 'The upright body and compact footprint are shown clearly in the main product photograph.',
        image: {
          alt: 'Demo rechargeable diffuser on a wooden side table',
          src: heroImage,
        },
      },
      {
        title: 'Or mount it on the wall',
        description: 'A separate feature visual shows the transparent bracket and rear mounting slot.',
        image: {
          alt: 'Demo diffuser and transparent wall-mount bracket',
          src: wallMountImage,
        },
      },
    ],
    faqs: [
      {
        question: 'Is this a live product offer?',
        answer: 'No. The product photography, copy, prices and package IDs are demonstration content for reviewing the page design.',
      },
      {
        question: 'What will be replaced before launch?',
        answer: 'The final page needs approved product media, verified features, real offer IDs and prices, delivery terms, support details and the approved ERP request contract.',
      },
      {
        question: 'Does this demo create an ERP order?',
        answer: 'No. Development uses local mocks, and the packaged demonstration does not submit a live order.',
      },
    ],
    orderSteps: [
      {
        title: 'Choose a package',
        description: 'Select the single-set or two-set demonstration offer.',
      },
      {
        title: 'Enter delivery details',
        description: 'Complete the reusable customer and delivery fields.',
      },
      {
        title: 'Review confirmation handling',
        description: 'The live implementation will use the approved ERP success response.',
      },
      {
        title: 'Replace demo fulfilment copy',
        description: 'Add only approved delivery and payment terms before launch.',
      },
    ],
    cta: {
      title: 'Choose your diffuser demo package',
      description: 'Review the package selection and customer delivery form below.',
      label: 'Yes, show me the order form',
      href: '#order-form',
    },
  },
  media: {
    hero: {
      alt: 'Demo rechargeable aroma diffuser with pink and blue ambient light',
      src: heroImage,
    },
    gallery: [
      {
        alt: 'Rechargeable diffuser shown in a warm living room',
        src: heroImage,
      },
      {
        alt: 'Rechargeable diffuser glowing beside a bed',
        src: bedroomImage,
      },
      {
        alt: 'Rechargeable diffuser demonstrated with a wall-mount bracket',
        src: wallMountImage,
      },
    ],
  },
  offers: [
    {
      id: 1,
      label: '1 diffuser set',
      price: {
        originalDisplay: 'NGN 35,000',
        display: 'NGN 28,000',
        note: 'Demo price only',
      },
      contents: '1 demo diffuser, 1 demo bottle and 1 wall bracket.',
      status: 'placeholder',
    },
    {
      id: 2,
      label: '2 diffuser sets',
      price: {
        originalDisplay: 'NGN 70,000',
        display: 'NGN 54,000',
        note: 'Demo price only',
      },
      contents: '2 demo diffusers, 2 demo bottles and 2 wall brackets.',
      status: 'placeholder',
    },
  ],
  sections: {
    gallery: true,
    benefits: true,
    demonstration: true,
    video: false,
    testimonials: false,
    faq: true,
    cta: true,
    orderForm: true,
  },
  theme: {
    accent: 'oklch(0.56 0.22 25)',
    accentForeground: 'oklch(0.99 0.005 75)',
    canvas: 'oklch(0.99 0.004 80)',
    ink: 'oklch(0.17 0.01 40)',
    muted: 'oklch(0.44 0.018 50)',
    surface: 'oklch(0.96 0.035 84)',
  },
  isDemoContent: true,
  isPlaceholder: false,
}
