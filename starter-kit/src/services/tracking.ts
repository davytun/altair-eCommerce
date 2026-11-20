import { isProductionTrackingEnabled } from '../lib/env'

type MetaPixel = (
  action: 'track',
  eventName: 'Purchase',
  parameters: { currency: 'NGN'; value: number },
  options: { eventID: string },
) => void

declare global {
  interface Window {
    fbq?: MetaPixel
  }
}

export type ConfirmedOrderForTracking = {
  id: number
  total: number | string
}

const trackedOrderIds = new Set<number>()

function parseNairaAmount(total: ConfirmedOrderForTracking['total']) {
  const amount = typeof total === 'number'
    ? total
    : Number(String(total).replace(/[^\d.]/g, ''))

  return Number.isFinite(amount) && amount > 0 ? amount : undefined
}

/**
 * Fires no PageView. This function is intentionally not used by mocks and is
 * safe by default: it runs only in an explicitly enabled production build.
 */
export function trackConfirmedPurchase(order: ConfirmedOrderForTracking) {
  if (!isProductionTrackingEnabled || typeof window === 'undefined') {
    return false
  }

  if (!Number.isFinite(order.id) || trackedOrderIds.has(order.id)) {
    return false
  }

  const amount = parseNairaAmount(order.total)
  if (!amount || typeof window.fbq !== 'function') {
    return false
  }

  trackedOrderIds.add(order.id)
  window.fbq(
    'track',
    'Purchase',
    { value: amount, currency: 'NGN' },
    { eventID: `erp_meta_purchase_${order.id}` },
  )

  return true
}
