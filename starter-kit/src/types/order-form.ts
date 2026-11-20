export type OrderFormValues = {
  customer_name: string
  delivery_state: string
  email_address: string
  home_address: string
  mobile_number: string
  product_id: number | null
  whatsapp_number: string
}

export type OrderFormErrors = Partial<Record<keyof OrderFormValues, string>>

export type OrderFormDraft = {
  offerWasExplicitlySelected: boolean
  values: OrderFormValues
}

export type OrderFormSubmitResult = {
  message: string
  status: 'mock-created' | 'queued'
}
