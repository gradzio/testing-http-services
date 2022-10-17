import {
  HttpBackend,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export interface HttpContract<T, K> {
  consumer: string;
  provider: string;
  state: string;
  request: {
    headers: { [name: string]: string };
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: T;
    queryParams?: Record<string, string>;
  };
  response: { body: K; status: HttpStatusCode };
}

export const provideHttpTestingBackend = <T, K>(data: HttpContract<T, K>) => ({
  provide: HttpBackend,
  useValue: {
    handle(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
      if (req.url !== data.request.url) {
        throw new Error(
          'Request urls do not match: expected: ' +
            data.request.url +
            ', received: ' +
            req.url
        );
      }
      if (req.method !== data.request.method) {
        throw new Error(
          'Request methods do not match: expected: ' +
            data.request.method +
            ', received: ' +
            req.method
        );
      }
      const sortedReqHeaders = req.headers.keys().sort();
      const sortedExpectedHeaders = Object.keys(data.request.headers).sort();
      if (sortedReqHeaders.toString() !== sortedExpectedHeaders.toString()) {
        const extraHeaders = sortedReqHeaders.filter(
          (header) => data.request.headers[header] === undefined
        );
        const missingHeaders = sortedExpectedHeaders.filter(
          (header) => !req.headers.has(header)
        );
        throw new Error(
          'Request headers do not match: ' +
            (missingHeaders.length > 0
              ? ' missing headers: ' + missingHeaders.join(', ')
              : '') +
            (extraHeaders.length > 0
              ? ' extra headers: ' + extraHeaders.join(', ')
              : '')
        );
      }
      const headersDiffvalues = sortedExpectedHeaders.reduce((diff, key) => {
        const recVal = data.request.headers[key];
        const expVal = req.headers.get(key);
        if (recVal !== expVal) {
          diff.push({
            header: key,
            expected: expVal,
            received: recVal,
          });
        }
        return diff;
      }, [] as Record<string, string | null>[]);
      if (headersDiffvalues.length > 0) {
        throw new Error(
          'Request header values do not match: ' +
            headersDiffvalues.map(
              (hd) =>
                hd['header'] +
                ': expected ' +
                hd['expected'] +
                ' but received ' +
                hd['received']
            )
        );
      }
      const receivedBodyString =
        data.request.body == null ? null : JSON.stringify(data.request.body);
      const expectedBodyString = req.serializeBody();
      if (expectedBodyString !== receivedBodyString) {
        throw new Error(
          'Request body do not match: expected: ' +
            expectedBodyString +
            ' but received ' +
            receivedBodyString
        );
      }
      const expectedParams = req.params.toString();
      const receivedParams =
        data.request.queryParams === undefined
          ? ''
          : JSON.stringify(data.request.queryParams);
      if (expectedParams !== receivedParams) {
        throw new Error(
          'Request query params do not match: expected: ' +
            expectedParams +
            ' but received ' +
            receivedParams
        );
      }
      return new Observable((observer: Observer<HttpResponse<unknown>>) => {
        if (data.response.status >= 400) {
          observer.error(
            new HttpErrorResponse({
              error: data.response.body,
              status: data.response.status,
              url: data.request.url || undefined,
            })
          );
        } else {
          observer.next(new HttpResponse(data.response));
          observer.complete();
          // Save or publish your contract here...
        }
      });
    },
  },
});
