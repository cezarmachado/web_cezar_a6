import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {EmailParam} from './email-param.model'
import {GlobalParamService} from '../global.parameters.services'

@Component({
	selector: 'app-email-param',
	templateUrl: './email-param.component.html'
})
export class EmailParamComponent implements OnInit {

	emailParam: EmailParam[] 
	globalParamForm: FormGroup
	
	constructor(
		private router: Router,
		private FormBuilder: FormBuilder,
		private GlobalParamService: GlobalParamService
	) {
		this.createForm();
	}

	ngOnInit() {
		this.getEmailParam()
	}

	createForm() {  
		this.globalParamForm = this.FormBuilder.group({
			mailService: this.FormBuilder.control(''),
			mailUserName: this.FormBuilder.control(''),
			mailPassword: this.FormBuilder.control('')
		})     
	}

	getEmailParam() {
		this.GlobalParamService.emailParam()
		.subscribe(emailParams => {
			this.emailParam = emailParams
			this.setParamEmail()
		}
	)}

	setParamEmail(){
		if (typeof this.emailParam[0] != "undefined"){
			this.globalParamForm.setValue({
				mailService:  this.emailParam[0].mailService,
				mailUserName: this.emailParam[0].mailUserName,
				mailPassword: this.emailParam[0].mailPassword
			})
		} else {
			this.globalParamForm.setValue({
				mailService:  '',
				mailUserName: '',
				mailPassword: ''
			})
		}
	}

	updateParamEmail(){
		if (typeof this.emailParam[0] === "undefined"){
			this.GlobalParamService.createEmailParam(this.globalParamForm.value)
			.subscribe(emailParams => {
				this.emailParam[0] = emailParams
				this.setParamEmail()
				this.router.navigate(['/home']); 
			})
		} else {
			this.emailParam[0].mailService = this.globalParamForm.value.mailService
			this.emailParam[0].mailUserName = this.globalParamForm.value.mailUserName
			this.emailParam[0].mailPassword = this.globalParamForm.value.mailPassword
			this.GlobalParamService.updateemailParam(this.emailParam[0])
			.subscribe(emailParams => {
				this.emailParam[0] = emailParams
				this.setParamEmail()
				this.router.navigate(['/home']); 
			})
		}
	}
}
