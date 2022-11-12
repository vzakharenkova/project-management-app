import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { StateModel } from '../store/state/state.model';
import { selectToken } from '../store/selectos/app.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token$: Observable<string | null>;

  constructor(private store: Store<StateModel>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/signin' || '/signup' || '/logs')) {
      return next.handle(req);
    } else {
      this.token$ = this.store.select(selectToken);
      const cloned = req.clone({ body: { ...req.body, token: this.token$ } });
      return next.handle(cloned);
    }
  }
}
