import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { User } from './auth.model';
import { WEBCEZAR_API } from '../app.api';
import { NotificationService } from '../shared/messages/notification.service';
import { ErrorHandler } from '../app.error-handler';
import * as jsSHA from 'jssha';





@Injectable()
export class AuthService {

    public token: string;
    user: User = null;

    constructor(public toastr: ToastrService,
                private http: Http,
                private notificationService: NotificationService) {
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }


    private _serverError(err: any) {
        let errrorsArray: any;
        errrorsArray = err.json().errors;
        if (errrorsArray instanceof Array) {
            errrorsArray.forEach(msg => this.toastr.error(msg, 'Erro!'));
            return Observable.throw(errrorsArray || 'backend server error');
        } else {
            this.toastr.error(errrorsArray, 'Erro!');
            return Observable.throw(errrorsArray || 'backend server error');
        }
    }

    private _succes (message: string[]) {
        message.forEach(msg => this.toastr.success(msg, 'Sucesso!'));
    }

    
   
    logIn(user: User): Observable<any> {
        const headers = new Headers()
        let shaObj = new jsSHA("SHA-1", "TEXT");
        console.log(shaObj)
        shaObj.update(user.password);
        let hash = shaObj.getHash("B64");
        //let hash = '' ;
        let encoded = encodeURIComponent(hash);
        let username = user.email;

       
        

        return this.http.get(`/dts/datasul-rest/resources/login?username=${username}&password=${encoded}`,
        new RequestOptions({headers: headers} ) )
            .map((response: Response) => {
                const tokenn = response.text() ;
                console.log('tokenn');
                user.token = tokenn;
                if (tokenn) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return true ;
                } else {
                    return false ;
                }
            })
            .catch(error => this._serverError(error))
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    } 
}
