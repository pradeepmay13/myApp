import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class GithubAuthInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	let currentUser = JSON.parse(localStorage.getItem('userData'));
    const authReq = req.clone({
      headers: req.headers
      .set('Authorization', currentUser.token)
      .set('Test', 'application/json')
    });
    return next.handle(authReq);
  }
}