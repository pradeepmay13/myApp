import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('userData'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}

/*
// Clone the request to add the new header.
const data = JSON.parse(localStorage.getItem('userData')); 


const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue")
	.set('Authorization', data.token)
	//.set('Content-Type', 'application/json')
});

const headers = new HttpHeaders({
  'Authorization': data.token,
  'Content-Type': 'application/json',
  "headerName":"headerValue"
});*/
/*
const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue")});
headers: req.headers.set('token1', 'asd')
.set('content_type', 'asd')
.set('accept', 'asd')*/