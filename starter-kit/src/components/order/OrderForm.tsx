import { useEffect, useState, type FormEvent } from 'react'
import type { ProductOffer } from '../../types/product'
import type { OrderFormDraft, OrderFormErrors, OrderFormSubmitResult, OrderFormValues } from '../../types/order-form'
import { Button } from '../ui/Button'
import { FormField } from '../ui/FormField'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { OfferSelector } from './OfferSelector'

type OrderFormProps = {
  offers: ProductOffer[]
  onDraftChange?: (draft: OrderFormDraft) => void
  onSubmit?: (values: OrderFormValues) => Promise<OrderFormSubmitResult>
}

const initialValues: OrderFormValues = {
  customer_name: '',
  delivery_state: '',
  email_address: '',
  home_address: '',
  mobile_number: '',
  product_id: null,
  whatsapp_number: '',
}

function validateOrderForm(values: OrderFormValues): OrderFormErrors {
  const errors: OrderFormErrors = {}

  if (values.product_id === null) errors.product_id = 'Choose an offer before continuing.'
  if (!values.customer_name.trim()) errors.customer_name = 'Enter your name.'
  if (!values.mobile_number.trim()) errors.mobile_number = 'Enter your phone number.'
  if (!values.home_address.trim()) errors.home_address = 'Enter your delivery address.'
  if (!values.delivery_state.trim()) errors.delivery_state = 'Enter your delivery state.'
  if (values.email_address && !/^\S+@\S+\.\S+$/.test(values.email_address)) {
    errors.email_address = 'Enter a valid email address or leave this field blank.'
  }

  return errors
}

export function OrderForm({ offers, onDraftChange, onSubmit }: OrderFormProps) {
  const [errors, setErrors] = useState<OrderFormErrors>({})
  const [offerWasExplicitlySelected, setOfferWasExplicitlySelected] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>()
  const [submitResult, setSubmitResult] = useState<OrderFormSubmitResult>()
  const [values, setValues] = useState<OrderFormValues>(initialValues)

  useEffect(() => {
    onDraftChange?.({ offerWasExplicitlySelected, values })
  }, [offerWasExplicitlySelected, onDraftChange, values])

  if (offers.length === 0) {
    return null
  }

  function updateValue(field: Exclude<keyof OrderFormValues, 'product_id'>, value: string) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setSubmitResult(undefined)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(undefined)
    setSubmitResult(undefined)

    const nextErrors = validateOrderForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    if (!onSubmit) {
      setSubmitError('Order submission is not configured for this page yet. No order has been created.')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await onSubmit(values)
      setSubmitResult(result)
    } catch {
      setSubmitError('We could not place the order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="order-section" id="order-form" aria-labelledby="order-form-title">
      <div className="container-content max-w-2xl">
        <div className="order-warning">
          <strong>Demo form only</strong>
          <span>No live order will be created from this packaged demonstration.</span>
        </div>
        <div className="sales-section-heading order-heading">
          <span>Order details</span>
          <h2 id="order-form-title">Choose an offer and enter delivery details</h2>
          <p>Required fields are marked with an asterisk.</p>
        </div>

        <form className="order-form mt-8" noValidate onSubmit={handleSubmit}>
          <OfferSelector
            error={errors.product_id}
            offers={offers}
            onChange={(productId) => {
              setValues((currentValues) => ({ ...currentValues, product_id: productId }))
              setOfferWasExplicitlySelected(true)
              setErrors((currentErrors) => ({ ...currentErrors, product_id: undefined }))
              setSubmitResult(undefined)
            }}
            value={values.product_id}
          />

          <div className="form-grid">
            <FormField error={errors.customer_name} htmlFor="customer-name" label="Full name" required>
              <Input
                aria-describedby={errors.customer_name ? 'customer-name-error' : undefined}
                aria-invalid={Boolean(errors.customer_name)}
                autoComplete="name"
                id="customer-name"
                onChange={(event) => updateValue('customer_name', event.target.value)}
                value={values.customer_name}
              />
            </FormField>
            <FormField error={errors.mobile_number} htmlFor="mobile-number" label="Phone number" required>
              <Input
                aria-describedby={errors.mobile_number ? 'mobile-number-error' : undefined}
                aria-invalid={Boolean(errors.mobile_number)}
                autoComplete="tel"
                id="mobile-number"
                inputMode="tel"
                onChange={(event) => updateValue('mobile_number', event.target.value)}
                type="tel"
                value={values.mobile_number}
              />
            </FormField>
            <FormField error={errors.whatsapp_number} htmlFor="whatsapp-number" label="WhatsApp number">
              <Input
                aria-describedby={errors.whatsapp_number ? 'whatsapp-number-error' : undefined}
                aria-invalid={Boolean(errors.whatsapp_number)}
                autoComplete="tel"
                id="whatsapp-number"
                inputMode="tel"
                onChange={(event) => updateValue('whatsapp_number', event.target.value)}
                type="tel"
                value={values.whatsapp_number}
              />
            </FormField>
            <FormField error={errors.email_address} htmlFor="email-address" label="Email address">
              <Input
                aria-describedby={errors.email_address ? 'email-address-error' : undefined}
                aria-invalid={Boolean(errors.email_address)}
                autoComplete="email"
                id="email-address"
                onChange={(event) => updateValue('email_address', event.target.value)}
                type="email"
                value={values.email_address}
              />
            </FormField>
          </div>

          <FormField error={errors.delivery_state} htmlFor="delivery-state" label="Delivery state" required>
            <Input
              aria-describedby={errors.delivery_state ? 'delivery-state-error' : undefined}
              aria-invalid={Boolean(errors.delivery_state)}
              autoComplete="address-level1"
              id="delivery-state"
              onChange={(event) => updateValue('delivery_state', event.target.value)}
              value={values.delivery_state}
            />
          </FormField>
          <FormField error={errors.home_address} htmlFor="home-address" label="Delivery address" required>
            <Textarea
              aria-describedby={errors.home_address ? 'home-address-error' : undefined}
              aria-invalid={Boolean(errors.home_address)}
              autoComplete="street-address"
              id="home-address"
              onChange={(event) => updateValue('home_address', event.target.value)}
              rows={4}
              value={values.home_address}
            />
          </FormField>

          {submitError && <p className="form-submit-error" role="alert">{submitError}</p>}
          {submitResult && (
            <p className="form-submit-status" role="status">
              {submitResult.message}
            </p>
          )}
          <Button disabled={isSubmitting} type="submit" width="full">
            {isSubmitting ? 'Submitting order...' : 'Submit order'}
          </Button>
        </form>
      </div>
    </section>
  )
}
