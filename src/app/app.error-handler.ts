import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private notificationService: NotificationService,
                private injector: Injector) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;
            const loginService = this.injector.get(LoginService);

            switch (errorResponse.status) {
                case 401:
                    loginService.handleLogin();
                    break;
                case 403:
                    this.notificationService.notify(message || "Não autorizado.");
                    break;
                case 404:
                    this.notificationService.notify(message || "Recurso não encontrado.");
                    break;

            }
        }

        super.handleError(errorResponse);
    }
}