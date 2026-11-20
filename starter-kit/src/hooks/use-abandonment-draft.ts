import { useCallback, useEffect, useRef } from 'react'
import type { OrderFormDraft } from '../types/order-form'
import type { AbandonmentGateway } from '../services/contracts'

const abandonmentDebounceMs = 3_000

type UseAbandonmentDraftOptions = {
  funnelSlug: string
  gateway: AbandonmentGateway
  sessionId: string
}

function hasDraftContent({ values, offerWasExplicitlySelected }: OrderFormDraft) {
  return Boolean(
    values.customer_name ||
      values.mobile_number ||
      values.whatsapp_number ||
      values.email_address ||
      values.home_address ||
      values.delivery_state ||
      (offerWasExplicitlySelected && values.product_id !== null),
  )
}

export function useAbandonmentDraft({ funnelSlug, gateway, sessionId }: UseAbandonmentDraftOptions) {
  const lastSubmittedFingerprint = useRef<string | undefined>(undefined)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current)
      }
    }
  }, [])

  return useCallback((draft: OrderFormDraft) => {
    if (timer.current) {
      window.clearTimeout(timer.current)
    }

    if (!hasDraftContent(draft)) {
      return
    }

    const fingerprint = JSON.stringify(draft)
    if (fingerprint === lastSubmittedFingerprint.current) {
      return
    }

    timer.current = window.setTimeout(() => {
      void gateway.captureDraft({
        funnelSlug,
        landingPageUrl: window.location.href,
        offerWasExplicitlySelected: draft.offerWasExplicitlySelected,
        sessionId,
        values: draft.values,
      }).then(() => {
        lastSubmittedFingerprint.current = fingerprint
      }).catch(() => {
        // Abandonment must never block the customer from placing an order.
      })
    }, abandonmentDebounceMs)
  }, [funnelSlug, gateway, sessionId])
}
