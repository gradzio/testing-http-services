import { of } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { HttpProductsService } from './http-products.service';

describe('HttpProductsService', () => {
  const given = (expectedProducts: ProductModel[]) => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of(expectedProducts));
    const service = new HttpProductsService(httpClientSpy);
    return {
      service,
      httpClientSpy,
    };
  };

  it('should return expected products (HttpClient called once)', (done: DoneFn) => {
    const expectedProducts: ProductModel[] = [
      { id: 1, title: 'Product 1', price: 20 },
    ];
    const { service, httpClientSpy } = given(expectedProducts);

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
