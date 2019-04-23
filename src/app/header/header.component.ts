import {Component, OnInit} from '@angular/core';

import {User} from '../auth/auth.model'
import {ProfileService} from '../profile/profile.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    user: any;
    userL: User = {
        _id: 0,
        email: '',
        password: '',
        token: ''
    }

    constructor(
        private profileService: ProfileService,
    ) {   
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
}
