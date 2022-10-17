import { Inject, Injectable } from '@angular/core';
import { AdvancedProductModel } from '../models/advanced-product.model';
import { Config, CONFIG } from '../configs/default.config';

@Injectable()
export class AdvancedProductFactory {
  constructor(@Inject(CONFIG) private _config: Config) {
  }
  makeDefault(id: number, title: string, priceValue: number): AdvancedProductModel {
    return {
      id,
      title,
      price: {
        valueInCents: priceValue,
        currency: {
          symbol: this._config.currency.symbol,
          iso: this._config.currency.iso
        }
      },
      variants: [],
      quantityInStock: 0,
      categories: []
    }
  }
}
