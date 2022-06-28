import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt_token = localStorage.getItem('uber-clone-angular-token');

    if (jwt_token) {
      req = req.clone({
        setHeaders: { Authorization: `Token ${jwt_token}` },
      });
    }
    return next.handle(req);
  }
}
