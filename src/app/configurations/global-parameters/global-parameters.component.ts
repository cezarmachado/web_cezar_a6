import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-global-parameters',
    templateUrl: './global-parameters.component.html'
})
export class GlobalParametersComponent implements OnInit {

    globalParamForm: FormGroup

    constructor(
        private router: Router,
        private FormBuilder: FormBuilder,
    ) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.globalParamForm = this.FormBuilder.group({
            mailService: this.FormBuilder.control(''),
            mailUserName: this.FormBuilder.control(''),
            mailPassword: this.FormBuilder.control('')
        })
    }

}
