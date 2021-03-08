import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = { Token: "" };
    if (sessionStorage.currentUser != null) {
      currentUser = JSON.parse(sessionStorage.currentUser);
    }

    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + currentUser.Token
      }
    }
    );

    return next.handle(request);
  }
}
