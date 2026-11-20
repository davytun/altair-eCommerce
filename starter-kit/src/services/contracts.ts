import type { OrderFormSubmitResult, OrderFormValues } from '../types/order-form'

/**
 * Known customer fields collected by the UI. This is deliberately not an ERP
 * HTTP payload: the ERP's JSON envelope, aliases, and session placement are
 * awaiting written confirmation.
 */
export type KnownOrderDraft = Omit<OrderFormValues, 'product_id'> & {
  landingPageUrl: string
  product_id: number
  sessionId: string
}

export type AbandonmentDraft = {
  funnelSlug: string
  landingPageUrl: string
  offerWasExplicitlySelected: boolean
  sessionId: string
  values: OrderFormValues
}

export interface OrderGateway {
  createOrder(draft: KnownOrderDraft): Promise<OrderFormSubmitResult>
}

export interface AbandonmentGateway {
  captureDraft(draft: AbandonmentDraft): Promise<void>
}
