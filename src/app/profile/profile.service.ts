import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '../app.error-handler';
import 'rxjs/add/operator/map';

import {User} from '../auth/auth.model'
import { WEBCEZAR_API } from '../app.api';

@Injectable()
export class ProfileService {

    userLogged: User;

    constructor(private http: Http ) {}

    getProfile(search?: string): Observable<User[]> {
        const headers = new Headers()
        const token = JSON.parse(localStorage.getItem('currentUser')).token ;
        headers.append('Authorization', token);
        headers.append('Content-Type', 'application/json')
        return this.http.get(`${WEBCEZAR_API}/api/users?email=${search}`, 
                        new RequestOptions({headers: headers}) )
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    updateProfile(user: User) {
        const headers = new Headers()
        const token = JSON.parse(localStorage.getItem('currentUser')).token ;
        headers.append('Authorization', token);
        headers.append('Content-Type', 'application/json')
        return this.http.put(`${WEBCEZAR_API}/api/users/${user._id}`,
                JSON.stringify(user),
                new RequestOptions({headers: headers}) )
                .map(response => response.json())
                .catch(ErrorHandler.handleError)
    }

    getCurrentProfile(){
        const headers = new Headers()
        const token = JSON.parse(localStorage.getItem('currentUser')).token ;
        const userLogged = JSON.parse(localStorage.getItem('currentUser')).email ;
        headers.append('Authorization', token);
        headers.append('Content-Type', 'application/json')
        return this.http.get(`${WEBCEZAR_API}/api/users?email=${userLogged}`, 
                        new RequestOptions({headers: headers}) )
        .map(response => response.json())
        .catch(ErrorHandler.handleError)  
    }
}