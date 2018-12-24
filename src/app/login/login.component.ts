import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userForm: FormGroup;
	responseData: any;
	errorMessage: string ='';
	successMessage: string ='';
	public loadingLoader = false;
	constructor(private fb: FormBuilder, private authService:AuthService, private router: Router) { }

	ngOnInit() {
		this.authService.loadUserInfo();
		if(this.authService.isUserLoggedIn===true){
			this.router.navigate(['./home']);
		}
		this.userForm = this.fb.group({
			username: ['', Validators.required],
			userpassword: ['', Validators.required]
		})
	}
	formSubmit(){
		this.loadingLoader = true;
		let frmData=this.userForm.value;
		this.authService.login(frmData)
	    .subscribe(
	      response => {
	        this.responseData = response;
	        if (response.execution === '1' ) {
	          localStorage.setItem('userData', JSON.stringify(this.responseData));
	          this.authService.loadUserInfo();
	          this.authService.userDetail();

	          this.router.navigate(['./home']);
	        } else {
	        	this.errorMsgTimeout(this.responseData.data.message, 3000);
	        	this.loadingLoader = false;
	        }
	      }
	    )  
	}
	// This method is used to set timeout on the error message box.
	errorMsgTimeout(message: string, time: number) {
		this.errorMessage = message;
		setTimeout(() => {
		  this.errorMessage = '';
		}, time);
	}

	// This method is used to set timeout on the succes message box.
	successMsgTimeout(message: string, time: number) {
		this.successMessage = message;
		setTimeout(() => {
		  this.successMessage = '';
		}, time);
	}
}
