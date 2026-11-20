import type { CSSProperties } from 'react'
import type { ProductTheme } from '../types/product'

export function toProductCssProperties(theme: ProductTheme) {
  return {
    '--page-accent': theme.accent,
    '--page-accent-foreground': theme.accentForeground,
    '--page-canvas': theme.canvas,
    '--page-ink': theme.ink,
    '--page-muted': theme.muted,
    '--page-surface': theme.surface,
  } as CSSProperties
}
