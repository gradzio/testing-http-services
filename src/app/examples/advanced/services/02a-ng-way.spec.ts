import { HttpStatusCode } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_PRODUCT } from '../models/advanced-product.model.stub';
import { HttpAdvancedProductsService } from './http-advanced-products.service';
import { HttpAdvancedProductsServiceModule } from './http-advanced-products.service-module';

describe('Angular way to test HttpAdvancedProductsService', () => {
  const given = () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpAdvancedProductsServiceModule],
    });

    const httpTestingController = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(HttpAdvancedProductsService);
    return {
      service,
      httpTestingController,
    };
  };

  it('should return getAll', () => {
    const contract = {
      consumer: 'my-app',
      provider: 'my-backend',
      providerState: 'There is a default product',
      request: {
        url: 'https://fakestoreapi.com/products',
        method: 'GET',
      },
      response: {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
        body: {
          data: [
            {
              id: DEFAULT_PRODUCT.id,
              title: DEFAULT_PRODUCT.title,
              price: DEFAULT_PRODUCT.price.valueInCents,
            },
          ],
        },
      },
    };
    const { service, httpTestingController } = given();

    service
      .getAll()
      .subscribe((productModels) =>
        expect(productModels).toEqual([DEFAULT_PRODUCT])
      );

    const req = httpTestingController.expectOne(contract.request.url);

    expect(req.request.method).toEqual(contract.request.method);

    req.flush(contract.response.body, {
      status: contract.response.status,
      statusText: contract.response.statusText,
    });

    httpTestingController.verify();
    // Save or publish contract
  });
});
