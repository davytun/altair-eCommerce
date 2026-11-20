import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type FormFieldProps = {
  children: ReactNode
  error?: string
  hint?: string
  htmlFor: string
  label: string
  required?: boolean
}

export function FormField({ children, error, hint, htmlFor, label, required }: FormFieldProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined
  const errorId = error ? `${htmlFor}-error` : undefined

  return (
    <div className="grid gap-2">
      <label className="field-label" htmlFor={htmlFor}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && <p id={hintId} className="field-hint">{hint}</p>}
      {error && (
        <p id={errorId} className={cn('field-error')} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
