import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Container } from './Container'

type SectionProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
  tone?: 'canvas' | 'surface' | 'ink'
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Section<T extends ElementType = 'section'>({
  as,
  children,
  className,
  tone = 'canvas',
  ...props
}: SectionProps<T>) {
  const Component = as ?? 'section'

  return (
    <Component className={cn('section-space', `section-${tone}`, className)} {...props}>
      <Container>{children}</Container>
    </Component>
  )
}
