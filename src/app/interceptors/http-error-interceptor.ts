import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          if (error.error.email) {
            errorMsg = `${error.error.email[0]}`;
          } else if (error.error.response) {
            errorMsg = 'Invalid code';
          } else if (error.error?.response?.data?.response) {
            errorMsg = 'Invalid code';
          } else if (error.error.detail) {
            if (error.error.detail === 'Not found.') {
              errorMsg = 'Incorrect token or token has been expired';
            }
            errorMsg = error.error.detail;
          } else if (error.error?.non_field_errors) {
            errorMsg = error.error?.non_field_errors;
          } else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
