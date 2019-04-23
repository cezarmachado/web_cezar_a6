import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ErrorHandler} from '../../app.error-handler';
import 'rxjs/add/operator/map';

import {EmailParam} from './email-param/email-param.model'
import {WEBCEZAR_API} from '../../app.api';

@Injectable()
export class GlobalParamService {

	constructor(private http: Http ) {}

	emailParam(search?: string): Observable<EmailParam[]> {
		const headers = new Headers()
		const token = JSON.parse(localStorage.getItem('currentUser')).token ;
		headers.append('Authorization', token);
		headers.append('Content-Type', 'application/json')
		return this.http.get(`${WEBCEZAR_API}/api/config/mailConfig`, 
					new RequestOptions({headers: headers}) )
		.map(response => response.json())
		.catch(ErrorHandler.handleError)
	}

	createEmailParam(emailParam: EmailParam) {
		const headers = new Headers()
		const token = JSON.parse(localStorage.getItem('currentUser')).token ;
		headers.append('Authorization', token);
		headers.append('Content-Type', 'application/json')
		return this.http.post(`${WEBCEZAR_API}/api/config/mailConfig`,
						JSON.stringify(emailParam),
						new RequestOptions({headers: headers}) )
						.map(response => response.json())
						.catch(ErrorHandler.handleError)
	}

	updateemailParam(emailParam: EmailParam) {
		const headers = new Headers()
		const token = JSON.parse(localStorage.getItem('currentUser')).token ;
		headers.append('Authorization', token);
		headers.append('Content-Type', 'application/json')
		return this.http.put(`${WEBCEZAR_API}/api/config/mailConfig/${emailParam._id}`,
					JSON.stringify(emailParam),
					new RequestOptions({headers: headers}) )
					.map(response => response.json())
					.catch(ErrorHandler.handleError)
	}

	testMail(data: any)    {
		const headers = new Headers()
		const token = JSON.parse(localStorage.getItem('currentUser')).token ;
		headers.append('Authorization', token);
		headers.append('Content-Type', 'application/json')
		return this.http.post(`${WEBCEZAR_API}/api/config/mailTest`,
						JSON.stringify(data),
						new RequestOptions({headers: headers}) )
						.map(response => response.json())
						.catch(ErrorHandler.handleError)

	}
}
