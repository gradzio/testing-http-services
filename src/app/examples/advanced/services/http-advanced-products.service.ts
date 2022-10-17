import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiClient } from '../clients/api.client';
import { AdvancedProductFactory } from '../factories/advanced-product.factory';
import { AdvancedProductModel } from '../models/advanced-product.model';
import { ProductResponse } from '../responses/product.response';

@Injectable()
export class HttpAdvancedProductsService {
  constructor(private _client: ApiClient, private _factory: AdvancedProductFactory) {
  }

  getAll(): Observable<AdvancedProductModel[]> {
    return this._client.get<ProductResponse[]>('/products')
      .pipe(map(products =>
        products.map(product => this._factory.makeDefault(product.id, product.title, product.price))
      ));
  }

  create(product: Partial<AdvancedProductModel>): Observable<void> {
    return this._client.post<ProductResponse>('/products', product)
      .pipe(map(_ => void 0))
  }
}
