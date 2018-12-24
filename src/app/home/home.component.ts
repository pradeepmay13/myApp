import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormPopulationService } from '../services/form-population.service';
import { ValidationService } from '../validation/validation.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD/MM/YYYY'];
	public rrf_temp_tenure_from_date:string = this.formats[0];
  	rrfForm: FormGroup;
	responseData: any;
	errorMessage: string ='';
	successMessage: string ='';
	public loadingLoader = false;
	rrfOpenPosition:any;
	rrfReportingManager:any;
	populateData:any;
	rrfDepartment:any;
	rrfRegion:any;
	rrfBranches:any;
	tenureDiv:boolean=false;
	rrfVendor:boolean=false;
	vendorReadonly:boolean=false;	
	datePattern="^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$";
	constructor(private fb: FormBuilder, private authService:AuthService, private router: Router, private formPopulationService:FormPopulationService) { }

	ngOnInit() {
		this.prePopulationForm();
		this.rrfForm = this.fb.group({
			rrf_new_recruit: [{value: 'Y', disabled: false}, Validators.required],
			rrf_open_position: [{value: '', disabled: false}, Validators.required],
			rrf_reporting_mgr: [{value: '', disabled: false}, Validators.required],
			rrf_reporting_mgr_id: [{value: '', disabled: false}, Validators.required],
			rrf_grade: [{value: '', disabled: false}, Validators.required],
			rrf_department_location: [{value: '', disabled: false}, Validators.required],
			rrf_region: [{value: '', disabled: false}, Validators.required],
			rrf_project_name: [{value: '', disabled: false}, ],
			RRF_BRANCH_ID: [{value: '', disabled: false}, Validators.required],
			rrf_reason_for_vacancy: [{value: '', disabled: false}, Validators.required],
			rrf_workload_reasons: [{value: '', disabled: false}, ],
			rrf_name_person_replaced: [{value: '', disabled: false}, ],
			rrf_position_per_manpower_budget: [{value: '0', disabled: false}, ],
			rrf_LWD: [{value: '', disabled: false}, ],
			rrf_manpower_budget_reasons: [{value: '', disabled: false}, ],
			rrf_permananet_ftc_third_party: [{value: '', disabled: false}, Validators.required],
			rrf_ijp_external_hiring: [{value: '', disabled: false}, Validators.required],
			rrf_vendor_name: [{value: '', disabled: false}],
			rrf_temp_tenure_from_date: [{value:'', disabled: false}],
			rrf_temp_tenure_to_date: [{value: '', disabled: false}],
			rrf_sal_present_role_holder: [{value: '', disabled: false}, Validators.required],
			rrf_sal_proposed: [{value: '', disabled: false}, Validators.required],
			rrf_warehouse_allowance: [{value: 'N', disabled: false}, ],
			rrf_pli_target_bonus_sales_incentive: [{value: '', disabled: false}, Validators.required],
			rrf_min_experience: [{value: '', disabled: false}, Validators.required],
			rrf_min_qualification: [{value: '', disabled: false}, Validators.required],
			rrf_min_prof_qualification: [{value: '', disabled: false}, Validators.required],
			rrf_role: [{value: '', disabled: false}, ],
			email: [{value: '', disabled: false}],
		})
		this.rrfForm.get('rrf_permananet_ftc_third_party').valueChanges.subscribe(
		    (payRoll: string) => {
		        if (payRoll !== 'Permanent' && payRoll != '' && payRoll != null && payRoll != undefined) {
		            this.rrfForm.get('rrf_vendor_name').setValidators([Validators.required]);
		            this.rrfForm.get('rrf_temp_tenure_from_date').setValidators([Validators.required, Validators.pattern(this.datePattern)]);
		            this.rrfForm.get('rrf_temp_tenure_to_date').setValidators([Validators.required, Validators.pattern(this.datePattern)]);
		            this.rrfForm.get('email').setValidators([Validators.required, ValidationService.emailValidator]);
				} else {
		            this.rrfForm.get('rrf_vendor_name').setValidators([]);
		            this.rrfForm.get('rrf_temp_tenure_from_date').setValidators([]);
		            this.rrfForm.get('rrf_temp_tenure_to_date').setValidators([]);
		            this.rrfForm.get('email').setValidators([]);
		        }
		        this.rrfForm.get('rrf_vendor_name').updateValueAndValidity();
		        this.rrfForm.get('rrf_temp_tenure_from_date').updateValueAndValidity();
		        this.rrfForm.get('rrf_temp_tenure_to_date').updateValueAndValidity();
		        this.rrfForm.get('email').updateValueAndValidity();

		    }

		)
		this.test();
		//this.test2();
	}
	dataValidate(control: AbstractControl){
		console.log(control.value);
		if(control.value==null){
			return {'validDate':true};
		}		
		return null;
	}
	prePopulationForm(){
		this.formPopulationService.employeeData().subscribe(
			result=>{
  				console.log('employee data loaded successfully');
  				this.rrfReportingManager=result;
	  		},
	  		error=>{
	  			console.log('employee data loading fail');
	  		}
		)

		this.formPopulationService.openPosition().subscribe(
			result=>{
  				console.log('openPosition loaded successfully');
  				this.rrfOpenPosition=result;
	  		},
	  		error=>{
	  			console.log('openPosition loading fail');
	  		}
		)
		this.formPopulationService.getDepartment().subscribe(
			result=>{
  				console.log('Department loaded successfully');
  				this.rrfDepartment=result;
	  		},
	  		error=>{
	  			console.log('Department loading fail');
	  		}
		)
		this.formPopulationService.rrfRegion().subscribe(
			result=>{
  				console.log('Region loaded successfully');
  				this.rrfRegion=result;
	  		},
	  		error=>{
	  			console.log('Region loading fail');
	  		}
		)
	}
	payRoll(event: any) {
       let rrf_payRoll=event.target.value;
       if(rrf_payRoll=='Permanent'){
       	this.tenureDiv=false;
       	this.rrfVendor=false;
       	this.vendorReadonly=false;
       	this.rrfForm.patchValue({rrf_vendor_name:""});
       	this.rrfForm.patchValue({rrf_temp_tenure_from_date:""});
       	this.rrfForm.patchValue({rrf_temp_tenure_to_date:""});
       }else if(rrf_payRoll=='FTC'){
       	this.tenureDiv=true;
       	this.rrfVendor=true;
       	this.vendorReadonly=true;
       	this.rrfForm.patchValue({rrf_vendor_name:"Schenker India Pvt Ltd"});
       }else if(rrf_payRoll=='3rd Party Roll'){
       	this.tenureDiv=true;
       	this.rrfVendor=true;
       	this.vendorReadonly=false;
       	this.rrfForm.patchValue({rrf_vendor_name:""});
       }
    }	
	managerData(event: any){
		let managerData = JSON.parse(event);
		this.rrfForm.patchValue({rrf_reporting_mgr_id:managerData.Employee_Code});
		this.rrfForm.patchValue({rrf_grade:managerData.DESIGNATION_NAME});
	}

    getBranches(event: any){
  		let branchName=event.target.value;
  		this.formPopulationService.getBranchData(branchName).subscribe(
			result=>{
  				console.log('Branch loaded successfully');
  				this.rrfBranches=result;
	  		},
	  		error=>{
	  			console.log('Branch loading fail');
	  		}
		)

    }
    test() {
    	//let arr=[1,2,3,1,5,6];
    	//let arr=[-1,-3];
    	//let arr=[1,2,3]
    	let arr=[1,2,3,4,6,-1]
	    let sortedArray=arr.sort((a,b)=> a-b);
	    let firstNum=sortedArray[0];
	    let lastNum=arr[arr.length-1]
	    //console.log(lastNum);
	    if(lastNum>0){
	    	console.log(this.getValue(firstNum,arr,sortedArray));
	    }
	    else{
	    	console.log(1);
	    }
	    
    }
    getValue(firstNum,arr,sortedArray){
    	for(let i=firstNum; i<=arr.length+1;i++){    		
	    	var a = sortedArray.indexOf(i);
	    	//console.log(a);
	    	if(a<0 && i>0){
	    		return i;
	    	}
	    }
    }
    test2(){
    	//let arr=[1,2,3,1,5,6];
    	//let arr=[-1,-3];
    	let arr=[1,2,3,4,6,-1]
	    let sortedArray=arr.sort((a,b)=> a-b);
	    let firstNum=sortedArray[0];
	    let lastNum=arr[arr.length-1]
	    console.log(sortedArray);
	    if(lastNum>0){
	    	var val= function(firstNum,arr,sortedArray){
	    		for(let i=firstNum; i<=arr.length+1; i++){
			    	var a = sortedArray.indexOf(i);
			    	if(a<0 && i>0){
			    		return i;
			    	}
			    }
	    	};
	    	console.log(val(firstNum,arr,sortedArray));
	    }
	    else{
	    	console.log(1);
	    }	

	    //var multiplyES5 = function(x, y) {
		//  return x * y;
		//}; 
		 

		//const multiplyES6 = (x, y) => { return x * y };

		//console.log(multiplyES6(7, 7));    
    }
}
