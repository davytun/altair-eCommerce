/** The live ERP order endpoint supplied by FlexShop. */
export const orderCreateEndpoint = 'https://erp.flexshop.ng/api/orders/create'

export type ErpRecommendedProduct = {
  image: string
  link: string
  price: string
  slug: string
  title: string
}

export type ErpCreatedOrder = {
  customer_name: string
  id: number
  order_number: string
  recommended_products: ErpRecommendedProduct[]
  thank_you_url: string
  total: number
}

export type ApprovedOrderHttpRequest = {
  body: BodyInit
  headers: HeadersInit
  signal?: AbortSignal
}

export type LiveOrderResult =
  | { kind: 'created'; order: ErpCreatedOrder }
  | { kind: 'queued' }
  | { kind: 'http-error'; status: number }
  | { kind: 'malformed-success' }
  | { kind: 'network-error' }

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null
}

function isRecommendedProduct(value: unknown): value is ErpRecommendedProduct {
  return isRecord(value) &&
    typeof value.slug === 'string' &&
    typeof value.title === 'string' &&
    typeof value.price === 'string' &&
    typeof value.image === 'string' &&
    typeof value.link === 'string'
}

function parseCreatedOrder(body: unknown): ErpCreatedOrder | undefined {
  if (!isRecord(body) || body.success !== true || !isRecord(body.data)) {
    return undefined
  }

  const data = body.data
  const recommendedProducts = data.recommended_products

  if (
    typeof data.id !== 'number' ||
    typeof data.order_number !== 'string' ||
    typeof data.customer_name !== 'string' ||
    typeof data.total !== 'number' ||
    typeof data.thank_you_url !== 'string' ||
    (recommendedProducts !== undefined &&
      (!Array.isArray(recommendedProducts) || !recommendedProducts.every(isRecommendedProduct)))
  ) {
    return undefined
  }

  const parsedRecommendedProducts: ErpRecommendedProduct[] = Array.isArray(
    recommendedProducts
  )
    ? recommendedProducts
    : []

  return {
    id: data.id,
    order_number: data.order_number,
    customer_name: data.customer_name,
    total: data.total,
    thank_you_url: data.thank_you_url,
    recommended_products: parsedRecommendedProducts,
  }
}

async function readJson(response: Response) {
  try {
    return await response.json()
  } catch {
    return undefined
  }
}

/**
 * Performs the live POST only after the ERP-approved request serializer has
 * supplied its exact body and headers. This function does not redirect, fire
 * tracking, expose server messages, or assume a JSON request envelope.
 */
export async function createOrder(request: ApprovedOrderHttpRequest): Promise<LiveOrderResult> {
  let response: Response

  try {
    response = await fetch(orderCreateEndpoint, {
      method: 'POST',
      headers: request.headers,
      body: request.body,
      signal: request.signal,
    })
  } catch {
    return { kind: 'network-error' }
  }

  if (response.status === 202) {
    return { kind: 'queued' }
  }

  if (response.status !== 201) {
    return { kind: 'http-error', status: response.status }
  }

  const order = parseCreatedOrder(await readJson(response))
  return order ? { kind: 'created', order } : { kind: 'malformed-success' }
}
