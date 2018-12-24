import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

@Injectable()
export class FormService {

	constructor(private http:Http) { }
	upload(formData) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.post('http://localhost/slim/public/uploadForm', formData)
		.map((response: Response) => response)
		.catch((error: any) => Observable.throw(error || {message: "Server Error"}));
	}
	uploadNew(formData) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.post('http://localhost/slim/public/uploadFormPNG', formData, {headers:headers})
		.map((response: Response) => response)
		.catch((error: any) => Observable.throw(error || {message: "Server Error"}));
	}
}
