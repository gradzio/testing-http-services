export interface AdvancedProductModel {
  readonly id: number;
  readonly title: string;
  readonly price: {
    valueInCents: number;
    currency: {
      symbol: string;
      iso: string;
    }
  }
  readonly variants: {
    id: number;
    name: string;
    size: string;
  }[]
  quantityInStock: number;
  categories: {
    id: number;
    name: string;
    productCount: number;
  }[]
}
