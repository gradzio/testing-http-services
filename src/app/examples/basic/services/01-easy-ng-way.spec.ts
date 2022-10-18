import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { HttpProductsService } from './http-products.service';

describe('HttpProductsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: HttpProductsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HttpProductsService(httpClientSpy);
  });

  it('should return expected products (HttpClient called once)', (done: DoneFn) => {
    const expectedProducts: ProductModel[] = [
      { id: 1, title: 'Product 1', price: 20 },
      { id: 2, title: 'Product 2', price: 10 },
    ];

    httpClientSpy.get.and.returnValue(of(expectedProducts));

    service.getAll().subscribe({
      next: (products) => {
        expect(products)
          .withContext('expected products')
          .toEqual(expectedProducts);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
