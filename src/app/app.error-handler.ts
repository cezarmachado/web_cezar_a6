import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';


export class ErrorHandler  {


    static handleError(error: Response | any) {
        // this.notificationService.notify('item')
        let errorMessage: string
        let errrorsArray: any;
        errrorsArray = error.json().errors;
        return Observable.throw(errorMessage)
    }
    constructor() { }

}
