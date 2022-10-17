import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpContext,
  HttpHandler,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '../../../../environments/environment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export const provideBaseUrl = {
  provide: API_BASE_URL,
  useValue: environment.apiUrl
}

@Injectable()
export class ApiClient extends HttpClient {
  constructor(
    @Inject(API_BASE_URL) private readonly _baseUrl: string,
    private readonly _handler: HttpHandler
  ) {
    super(_handler);
  }

  override request(
    first: string | HttpRequest<any>,
    url?: string,
    options: {
      body?: any;
      headers?: HttpHeaders | { [header: string]: string | string[] };
      context?: HttpContext;
      observe?: 'body' | 'events' | 'response';
      params?:
        | HttpParams
        | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    } = {}
  ): Observable<any> {
    if (first instanceof HttpRequest) {
      const clone = first.clone({
        url: `${this._baseUrl}${first.url}`,
      });
      return super.request(clone);
    }

    // first is an instance of string (an HTTP method), so we can be sure that url != null because it would not match any signature
    return super.request(first, `${this._baseUrl}${url}`, options);
  }
}

