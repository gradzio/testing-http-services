import { HttpClientModule, HttpStatusCode } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_PRODUCT } from '../models/advanced-product.model.stub';
import { HasData, ProductResponse } from '../responses/product.response';
import {
  HttpContract,
  provideHttpTestingBackend,
} from '../testing/provide-http-testing-backend';
import { HttpAdvancedProductsService } from './http-advanced-products.service';
import { HttpAdvancedProductsServiceModule } from './http-advanced-products.service-module';

describe('Greg way to test HttpAdvancedProductsService', () => {
  const given = (
    data: HttpContract<ProductResponse, HasData<ProductResponse[]>>
  ): HttpAdvancedProductsService => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpAdvancedProductsServiceModule],
      providers: [provideHttpTestingBackend(data)],
    });

    return TestBed.inject(HttpAdvancedProductsService);
  };

  it('should handle getAll', () => {
    const service = given({
      consumer: 'my-app',
      provider: 'my-backend',
      state: 'There is a default product',
      request: {
        headers: {},
        url: 'https://fakestoreapi.com/products',
        method: 'GET',
      },
      response: {
        body: {
          data: [
            {
              id: DEFAULT_PRODUCT.id,
              title: DEFAULT_PRODUCT.title,
              price: DEFAULT_PRODUCT.price.valueInCents,
            },
          ],
        },
        status: HttpStatusCode.Ok,
      },
    });

    service
      .getAll()
      .subscribe((productModels) =>
        expect(productModels).toEqual([DEFAULT_PRODUCT])
      );
  });
});
