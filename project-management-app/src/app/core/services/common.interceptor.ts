import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CommonInterceptor implements HttpInterceptor {
  BASE_URL = 'http://ec2-3-80-45-34.compute-1.amazonaws.com';
  // BASE_URL = 'http://34.88.100.156';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone({ url: this.BASE_URL + req.url });

    return next.handle(cloned);
  }
}
