import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
declare var window: any;

@Injectable()
export class AuthService {
  loggedInredirect:string='/home';
  loggedOffredirect:string='/login';
  loggedInUser: any;
  isUserLoggedIn: boolean = false;
  userDetailDataX:any;
  constructor(private router: Router, private http:Http) {
  	this.loadUserInfo();
  	this.userDetail();
  }
  login(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost/slim/public/login', JSON.stringify(data), { headers: headers })
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error || {message: "Server Error"}));
  }
  loadUserInfo() {
    const user = localStorage.getItem('userData') ? localStorage.getItem('userData') + '' : '';
    if (user) {
      this.loggedInUser = JSON.parse(user);
      if (this.loggedInUser) {
        this.isUserLoggedIn = true;
      }
    }
    else {
    	this.isUserLoggedIn = false;
    }
  }
  logout(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost/slim/public/logout', JSON.stringify(token), { headers: headers })
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error || {message: "Server Error"}));
  }
  userLogout(){
  	const data = JSON.parse(localStorage.getItem('userData')); 
  	this.logout(data.token)
	  .subscribe(
	    response=>{
	      if (response.execution === true ) {    
	        localStorage.clear();
  			this.isUserLoggedIn = false;
  			this.router.navigate(['./login']);
	      }
	    }
	  )
  	
  }
  getUser(token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost/slim/public/user', JSON.stringify(token), { headers: headers })
      .map((response: Response) => response.json() ) 
      .catch((error: any) => Observable.throw(error || {message: 'Server Error'}));
  }
  userDetail(){
    const data = JSON.parse(localStorage.getItem('userData'));    
    if(data!=null) {
	  const token=data.token;
      this.getUser(token)
      .subscribe(
        response=>{
          if (response.execution === true ) {    
            this.userDetailDataX=response.resultSet[0];  
          }else{
            this.userDetailDataX="";
          }
        }
      )
    }    
  }

}
