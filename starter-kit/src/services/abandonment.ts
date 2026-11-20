import type { AbandonmentDraft } from './contracts'

/** The live ERP abandonment endpoint supplied by FlexShop. */
export const abandonmentEndpoint = 'https://erp.flexshop.ng/api/public/abandonment'

export type AbandonmentFieldAliases = {
  address: 'address' | 'home_address'
  email: 'email' | 'email_address'
  name: 'customer_name' | 'full_name' | 'name'
  phone: 'mobile_number' | 'phone'
  whatsapp: 'whatsapp_number'
}

export type ErpAbandonmentPayload = {
  fields: Record<string, number | string>
  funnel_slug: string
  page_url: string
  session_id: string
}

export type ApprovedAbandonmentHttpRequest = {
  headers: HeadersInit
  signal?: AbortSignal
}

function addStringField(fields: ErpAbandonmentPayload['fields'], key: string, value: string) {
  if (value.trim()) {
    fields[key] = value.trim()
  }
}

/**
 * Maps local UI fields only after the ERP has selected one alias for each
 * abandonment field. product_id is included only after an explicit offer click.
 */
export function createAbandonmentPayload(
  draft: AbandonmentDraft,
  aliases: AbandonmentFieldAliases,
): ErpAbandonmentPayload {
  const fields: ErpAbandonmentPayload['fields'] = {}
  const { values } = draft

  addStringField(fields, aliases.name, values.customer_name)
  addStringField(fields, aliases.phone, values.mobile_number)
  addStringField(fields, aliases.email, values.email_address)
  addStringField(fields, aliases.address, values.home_address)
  addStringField(fields, aliases.whatsapp, values.whatsapp_number)

  if (draft.offerWasExplicitlySelected && values.product_id !== null) {
    fields.product_id = values.product_id
  }

  return {
    session_id: draft.sessionId,
    funnel_slug: draft.funnelSlug,
    page_url: draft.landingPageUrl,
    fields,
  }
}

/**
 * Performs the live abandonment POST only when an approved caller provides
 * its headers. Failure is returned as false so callers never block an order.
 */
export async function captureAbandonment(
  payload: ErpAbandonmentPayload,
  request: ApprovedAbandonmentHttpRequest,
) {
  try {
    const response = await fetch(abandonmentEndpoint, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(payload),
      signal: request.signal,
    })

    return response.ok
  } catch {
    return false
  }
}
