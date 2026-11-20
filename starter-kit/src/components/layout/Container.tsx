import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'content' | 'wide'
}

export function Container({ className, size = 'content', ...props }: ContainerProps) {
  return (
    <div
      className={cn(size === 'content' ? 'container-content' : 'container-wide', className)}
      {...props}
    />
  )
}
