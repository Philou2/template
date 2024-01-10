import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (req.url.includes('betterpay'))
    {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer Bearer 10|NbQJQJjoTgBITIBMf65IdMay9Sos17Axy0wirDVi'
        }
      });
    }
    else {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken
        }
      });
    }


    return next.handle(req);
  }



}
