import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_PRODUCT } from '../models/advanced-product.model.stub';
import { HasData, ProductResponse } from '../responses/product.response';
import { HttpAdvancedProductsService } from './http-advanced-products.service';
import { HttpAdvancedProductsServiceModule } from './http-advanced-products.service-module';

describe('Angular way to test HttpAdvancedProductsService', () => {
  let httpTestingController: HttpTestingController;
  let service: HttpAdvancedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpAdvancedProductsServiceModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpAdvancedProductsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return getAll', () => {
    const responseData: HasData<ProductResponse[]> = {
      data: [
        {
          id: DEFAULT_PRODUCT.id,
          title: DEFAULT_PRODUCT.title,
          price: DEFAULT_PRODUCT.price.valueInCents,
        },
      ],
    };

    service
      .getAll()
      .subscribe((productModels) =>
        expect(productModels).toEqual([DEFAULT_PRODUCT])
      );

    const req = httpTestingController.expectOne(
      'https://fakestoreapi.com/products'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(responseData);
  });
});
