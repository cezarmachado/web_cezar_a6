import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {User} from './auth.model'
import {AuthService} from './auth.service'
import { NotificationService } from '../shared/messages/notification.service'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

    authForm: FormGroup;
    member: boolean;
    error = '';

    numberPatter = /^[0-9]*$/

    static equalsTo(group: AbstractControl): {[key: string]: boolean} {
        const authPass = group.get('authPass');
        const authConfirmPass = group.get('authConfirmPass');
        if (!authPass || !authConfirmPass) {
            return undefined;
        }
        if (authPass.value !== authConfirmPass.value) {
            return{authPassNotMatch: true};
        }
        return undefined;
    }

    constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private router: Router,
        private FormBuilder: FormBuilder
    ) { }



    ngOnInit() {
        this.member = true
        this.authForm = this.FormBuilder.group({
            email: this.FormBuilder.control('', [Validators.required]),
            password: this.FormBuilder.control('', [Validators.required]),
        }, {validator: AuthComponent.equalsTo});
    }

    changeMember() {
        this.clearForm();
        if (this.member === true) {
            this.member = false ;
         } else {
            this.member = true ;
         }
    }

    logIn(user: User) {
        this.authService.logIn(user)
        .subscribe(result => {
            this.router.navigate(['/home']);
        });
    }

    clearForm() {
        this.authForm.setValue({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }
}
