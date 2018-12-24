import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormPopulationService {
  constructor(private http: HttpClient) { }

  openPosition(){
  	let Params = new HttpParams();
  	Params = Params.append('action', 'getdesignation');
	//Params = Params.append('secondParameter', secondVal);
  	return this.http.get('http://localhost/rrf/post-Json.php', { params: Params })
      .map((response: Response) => response ) 
      .catch((error: any) => Observable.throw(error || {message: 'Server Error'}));
  }
  employeeData(){
  	let Params = new HttpParams();
  	Params = Params.append('action', 'getEmployee');
	//Params = Params.append('secondParameter', secondVal);
  	return this.http.get('http://localhost/rrf/post-Json.php', { params: Params })
      .map((response: Response) => response ) 
      .catch((error: any) => Observable.throw(error || {message: 'Server Error'}));
  }
  getDepartment(){
  	let Params = new HttpParams();
  	Params = Params.append('action', 'getDepartment');
	//Params = Params.append('secondParameter', secondVal);
  	return this.http.get('http://localhost/rrf/post-Json.php', { params: Params })
      .map((response: Response) => response ) 
      .catch((error: any) => Observable.throw(error || {message: 'Server Error'}));
  }
  rrfRegion(){
  	let Params = new HttpParams();
  	Params = Params.append('action', 'getregion');
	//Params = Params.append('secondParameter', secondVal);
  	return this.http.get('http://localhost/rrf/post-Json.php', { params: Params })
      .map((response: Response) => response ) 
      .catch((error: any) => Observable.throw(error || {message: 'Server Error'}));
  }
  getBranchData(branchName){
  	let Params = new HttpParams();
	let Data= { action: "getbranchData", branchName: branchName }
  	return this.http.post('http://localhost/rrf/post-Json.php', Data)
      .map((response: Response) => response ) 
      .catch((error: any) => Observable.throw(error || {message: 'Server Error'}));
  }
}
