import {Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {Router } from '@angular/router';

import {EmailParam } from '../email-param.model'
import {GlobalParamService } from '../../global.parameters.services'

@Component({
    selector: 'app-email-test',
    templateUrl: './email-test.component.html'
})
export class EmailTestComponent implements OnInit {

    emailParam: EmailParam[]
    testEmailForm: FormGroup

    constructor(
        private router: Router,
        private FormBuilder: FormBuilder,
        private GlobalParamService: GlobalParamService
    ) {
        this.createForm()
    }

    ngOnInit() {
    }

    createForm() {  
		this.testEmailForm = this.FormBuilder.group({
			mailTo: this.FormBuilder.control(''),
			mailSubject: this.FormBuilder.control(''),
			mailBody: this.FormBuilder.control('')
		})     
    }
    
    sendTest(){
        this.GlobalParamService.testMail(this.testEmailForm.value)
        .subscribe(result => {
            this.router.navigate(['/home']);
        });
    }

}
