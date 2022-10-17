import { NgModule } from '@angular/core';
import { HttpAdvancedProductsService } from './http-advanced-products.service';
import { AdvancedProductFactory } from '../factories/advanced-product.factory';
import { defaultConfigProvider } from '../configs/default.config';
import { ApiClient } from '../clients/api.client';

@NgModule({
  imports: [],
  declarations: [],
  providers: [HttpAdvancedProductsService, ApiClient, AdvancedProductFactory, defaultConfigProvider],
  exports: []
})
export class HttpAdvancedProductsServiceModule {
}
