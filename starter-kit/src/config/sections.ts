import type { ProductConfig, ProductSectionKey } from '../types/product'

export function isSectionVisible(product: ProductConfig, section: ProductSectionKey) {
  return product.sections[section]
}
