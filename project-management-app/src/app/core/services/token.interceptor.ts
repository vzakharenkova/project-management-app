import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { getTokenFromLS } from '../../shared/utils/getTokenFromLS';
import { selectToken } from '../store/selectos/app.selectors';
import { StateModel } from '../store/state/state.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string | null;

  constructor(private store: Store<StateModel>, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/signin' || '/signup' || '/logs')) {
      return next.handle(req);
    } else {
      this.getToken();
      return next
        .handle(
          req.clone({
            setHeaders: {
              authorization: `Bearer ${this.token}`,
            },
          }),
        )
        .pipe(
          tap(
            () => {},
            (err) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status == 401) this.authService.logout();
              }
            },
          ),
        );
    }
  }

  private getToken() {
    this.token = getTokenFromLS();
  }
}
