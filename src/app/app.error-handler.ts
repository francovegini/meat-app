import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

export class ErrorHandler {
    static handleError(error: HttpErrorResponse | any) {
        let errorMsg: string;

        if (error instanceof HttpErrorResponse) {
            const body = error.error;
            errorMsg = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}`
        } else {
            errorMsg = error.message ? error.message : error.toString();
        }
        console.log(errorMsg);
        return Observable.throw(errorMsg);
    }
}