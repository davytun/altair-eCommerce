import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quiet'
  width?: 'auto' | 'full'
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  width = 'auto',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'button-base',
        `button-${variant}`,
        width === 'full' && 'w-full',
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
