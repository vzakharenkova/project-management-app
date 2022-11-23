import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class CommonInterceptor implements HttpInterceptor {
  // BASE_URL = 'http://ec2-3-80-45-34.compute-1.amazonaws.com';
  BASE_URL = 'http://34.88.100.156';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({ referrerPolicy: 'unsafe_url' });
    if (!req.url.includes('/assets/i18n/')) {
      const cloned = req.clone({ url: this.BASE_URL + req.url, headers });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
