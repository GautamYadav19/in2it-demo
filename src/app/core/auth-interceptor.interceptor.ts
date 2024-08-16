import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthServiceService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = JSON.parse(this._authService.getToken()!);
    let authReq = request;

    if (token) {
      authReq = request.clone({
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token.token}`),
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refreshToken = token?.refreshToken;
          if (refreshToken) {
            return this._authService.reFreshToken(refreshToken).pipe(
              switchMap((newToken: any) => {
                // Store the new token
                this._authService.setDataInLocalStorage(
                  'tkn',
                  JSON.stringify(newToken)
                );

                // Update the request with the new token
                authReq = request.clone({
                  headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${newToken.token}`),
                });

                // Retry the request with the new token
                return next.handle(authReq);
              })
            );
          }
        } else if (error.status === 403) {
          this.router.navigate(['']);
        }

        // If the error isn't a 401 or there's no refresh token, throw the error
        return throwError(() => error);
      })
    );
  }
}
