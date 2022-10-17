import { InjectionToken } from '@angular/core';

export const CONFIG = new InjectionToken<Config>('CONFIG')

export interface Config {
  currency: {
    symbol: string;
    iso: string;
  }
  country: string;
}

export const defaultConfigProvider = {
  provide: CONFIG,
  useValue: {
    currency: {
      symbol: "$",
      iso: "USD"
    },
    country: 'USA'
  }
}
