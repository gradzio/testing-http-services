import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class HttpProductsService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>(environment.apiUrl + '/products');
  }

  create(product: Partial<ProductModel>): Observable<void> {
    return this._httpClient.post<ProductModel>(environment.apiUrl + '/products', product)
      .pipe(map(_ => void 0));
  }
}
