// import { PactV3, V3MockServer } from '@pact-foundation/pact';
// import { HttpAdvancedProductsService } from './http-advanced-products.service';
// import * as path from 'path';
// import { TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpAdvancedProductsServiceModule } from './http-advanced-products.service-module';
// import { API_BASE_URL } from '../clients/api.client';

// describe('Pact way to test HttpAdvancedProductsService', function () {
//   const provider = new PactV3({
//     dir: path.resolve(process.cwd(), 'pacts'),
//     consumer: 'my-app',
//     provider: 'my-backend',
//   });

//   const given = (baseUrl: string): HttpAdvancedProductsService => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule, HttpAdvancedProductsServiceModule],
//       providers: [
//         {
//           provide: API_BASE_URL,
//           useValue: baseUrl,
//         },
//       ],
//     });

//     return TestBed.inject(HttpAdvancedProductsService);
//   };

//   it('should getAll', () => {
//     provider
//       .given('I have a list of dogs')
//       .uponReceiving('a request for all dogs with the builder pattern')
//       .withRequest({
//         method: 'GET',
//         path: '/products',
//       })
//       .willRespondWith({
//         status: 200,
//         body: [],
//       });

//     return provider.executeTest(async (mockserver: V3MockServer) => {
//       const service = given(mockserver.url);

//       const productModels = await service.getAll().toPromise();

//       expect(productModels).toEqual([]);
//     });
//   });
// });
