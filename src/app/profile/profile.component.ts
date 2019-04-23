import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormArray} from '@angular/forms';
import {Router} from '@angular/router';

import {User} from '../auth/auth.model'
import {ProfileService} from './profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

	updUser: User

	profileForm: FormGroup;
	authUser: any;
	user: User;

	constructor(
		private FormBuilder: FormBuilder,
		private profileService: ProfileService,
		private router: Router
	) {
		this.createForm();
	}

	ngOnInit() {
		this.getProfile();
	}

  	createForm() {  
    this.profileForm = this.FormBuilder.group({
		name: 			this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		email: 			this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		patient: 		Boolean,
		doctor: 		Boolean,
		administrator: 	Boolean,
		fullName: 		this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		country: 		this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		state: 			this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		city: 			this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		adress: 		this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		cpf: 			this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		rg: 			this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
		crm: 			this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
    	})     
	}

	getProfile(){
		this.authUser = JSON.parse(localStorage.getItem('currentUser'));
		this.profileService.getProfile(this.authUser.email)
        	.subscribe(user => {
			this.user = user[0]
			this.setProfile();
		});
	}

	setProfile(){
		this.profileForm.patchValue({
			email: 			this.user.email,
		});
	}

	updateProfile(updUser: User) {

		updUser._id				= this.user._id
		updUser.email			= this.profileForm.value.email
		
        this.profileService.updateProfile(updUser)
        .subscribe((nome: string) => {
            this.router.navigate(['/home']);
		})
	}
	

}
