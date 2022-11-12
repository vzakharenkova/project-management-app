import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { StateModel } from '../store/state/state.model';
import { selectToken } from '../store/selectos/app.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {
  token: string | null;

  private subscription$: Subscription;

  constructor(private store: Store<StateModel>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/signin' || '/signup' || '/logs')) {
      return next.handle(req);
    } else {
      this.getToken();
      return next.handle(
        req.clone({
          setHeaders: {
            authorization: `Bearer ${this.token}`,
          },
        }),
      );
    }
  }

  private getToken() {
    this.subscription$ = this.store
      .select(selectToken)
      .pipe(take(1))
      .subscribe((value) => (this.token = value));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
