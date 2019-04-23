import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '../app.error-handler';
import 'rxjs/add/operator/map';


@Injectable()
export class TesteService {

    constructor(
        private http: Http) {
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// this.token = currentUser && currentUser.token;
}

    getOrdens(): Observable<any> {
        const headers = new Headers()
        const token = JSON.parse(localStorage.getItem('currentUser')).token ;
        //headers.append('x-requested-with', 'xhr');
        
        headers.append('noErrorMessage', 'true');
        //headers.append('Origin', 'https://portal-teste.vipal.com.br');
        
        //headers.append('Access-Control-Allow-Origin', "*");
        console.log(`JOSSO_SESSIONID=${token}`)
        headers.append('Cookie', `JOSSO_SESSIONID=${token}`);
        //return http.open("GET", "https://cors-anywhere.herokuapp.com/https://maximum.blog/@shalvah/posts");
        
        return this.http.get('https://portal-teste.vipal.com.br/dts/datasul-rest/resources/api/ecm/fluig_utb/BuscaEmp?pEmpEms2=1&pEmpEms5=1&pDataParam=03-03-2019',
                
               new RequestOptions({headers: headers} ) )
               .map(response => response.json())
    }
}

/*

x-requested-with": "xhr" 
 return this.http.get(`/dts/datasul-rest/resources/login?username=${username}&password=${encoded}`)
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
    */