import { TokenStorageService } from './../token-storage-service/token-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpInterceptorService implements HttpInterceptorService {
  constructor(private tokenStorage: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenStorage.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
];
