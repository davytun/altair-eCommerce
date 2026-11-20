import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <select className={cn('field-control', className)} {...props}>
      {children}
    </select>
  )
}
