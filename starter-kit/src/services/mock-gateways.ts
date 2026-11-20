import type { AbandonmentGateway, OrderGateway } from './contracts'

const mockDelayMs = 350

function waitForMock() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, mockDelayMs)
  })
}

/**
 * Development-only gateways. They discard all drafts and never use fetch,
 * tracking, console logging, or browser storage for customer details.
 */
export const mockOrderGateway: OrderGateway = {
  async createOrder() {
    await waitForMock()
    return {
      status: 'mock-created',
      message: 'Development mock completed. No ERP order, payment, redirect, or tracking event was created.',
    }
  },
}

export const mockAbandonmentGateway: AbandonmentGateway = {
  async captureDraft() {
    await waitForMock()
  },
}
