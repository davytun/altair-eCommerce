import { PageShell } from './components/layout/PageShell'
import { OrderForm } from './components/order/OrderForm'
import { Benefits } from './components/sections/Benefits'
import { CtaSection } from './components/sections/CtaSection'
import { Demonstration } from './components/sections/Demonstration'
import { Faq } from './components/sections/Faq'
import { Hero } from './components/sections/Hero'
import { IncludedItems } from './components/sections/IncludedItems'
import { OfferSummary } from './components/sections/OfferSummary'
import { OrderJourney } from './components/sections/OrderJourney'
import { ProductGallery } from './components/sections/ProductGallery'
import { SalesFooter } from './components/sections/SalesFooter'
import { Testimonials } from './components/sections/Testimonials'
import { VideoDemo } from './components/sections/VideoDemo'
import { product } from './config/product'
import { isSectionVisible } from './config/sections'
import { toProductCssProperties } from './config/theme'
import { useAbandonmentDraft } from './hooks/use-abandonment-draft'
import { usePageSessionId } from './hooks/use-page-session-id'
import { environment } from './lib/env'
import { mockAbandonmentGateway, mockOrderGateway } from './services/mock-gateways'
import type { OrderFormSubmitResult, OrderFormValues } from './types/order-form'

function App() {
  const showDemoNotice = product.isPlaceholder || product.isDemoContent
  const sessionId = usePageSessionId(product.identity.slug)
  const queueAbandonmentDraft = useAbandonmentDraft({
    funnelSlug: product.identity.slug,
    gateway: mockAbandonmentGateway,
    sessionId,
  })
  const usesDevelopmentMocks = environment === 'development'

  async function submitDevelopmentMock(values: OrderFormValues): Promise<OrderFormSubmitResult> {
    if (values.product_id === null) {
      return {
        status: 'queued',
        message: 'Choose an offer before submitting the form.',
      }
    }

    return mockOrderGateway.createOrder({
      ...values,
      landingPageUrl: window.location.href,
      product_id: values.product_id,
      sessionId,
    })
  }

  return (
    <div style={toProductCssProperties(product.theme)}>
      <PageShell productName={product.identity.name} productSlug={product.identity.slug}>
        <main id="main-content">
          {showDemoNotice && (
            <div className="preview-banner" role="status">
              Demo content only: product copy, media, prices, and delivery terms must be replaced before launch. Local ERP mocks are active, so no customer details leave this browser and no order is created.
            </div>
          )}
          <Hero
            cta={product.content.cta}
            description={product.content.description}
            headline={product.content.headline}
            image={product.media.hero}
            name={product.identity.name}
            showMediaPlaceholder={showDemoNotice}
          />
          {isSectionVisible(product, 'gallery') && (
            <ProductGallery images={product.media.gallery} showMediaPlaceholder={showDemoNotice} />
          )}
          <IncludedItems items={product.content.included ?? []} />
          {isSectionVisible(product, 'benefits') && <Benefits benefits={product.content.benefits ?? []} />}
          {isSectionVisible(product, 'demonstration') && <Demonstration steps={product.content.demoSteps ?? []} />}
          {isSectionVisible(product, 'video') && (
            <VideoDemo showMediaPlaceholder={showDemoNotice} video={product.content.video} />
          )}
          {isSectionVisible(product, 'testimonials') && <Testimonials testimonials={product.content.testimonials ?? []} />}
          {isSectionVisible(product, 'cta') && <CtaSection cta={product.content.cta} />}
          <OrderJourney steps={product.content.orderSteps ?? []} />
          <OfferSummary offers={product.offers} />
          {isSectionVisible(product, 'orderForm') && (
            <OrderForm
              offers={product.offers}
              onDraftChange={usesDevelopmentMocks ? queueAbandonmentDraft : undefined}
              onSubmit={usesDevelopmentMocks ? submitDevelopmentMock : undefined}
            />
          )}
          {isSectionVisible(product, 'faq') && <Faq faqs={product.content.faqs ?? []} />}
        </main>
        <SalesFooter />
        <a className="mobile-order-cta" href="#order-form">View demo order form</a>
      </PageShell>
    </div>
  )
}

export default App
