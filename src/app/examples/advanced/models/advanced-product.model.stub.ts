import { AdvancedProductModel } from './advanced-product.model';

export const DEFAULT_PRODUCT: AdvancedProductModel = {
  id: 1,
  title: 'Product 1',
  variants: [],
  categories: [],
  quantityInStock: 0,
  price: {
    valueInCents: 100,
    currency: {
      symbol: '$',
      iso: 'USD',
    },
  },
};
