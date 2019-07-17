import { Component } from '@angular/core';
import { LoginService } from '../../security/login/login.service'
import { User } from '../../security/login/user.model'

@Component({
    selector: 'mt-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

    constructor(private loginService: LoginService) {
    }

    user(): User {
        return this.loginService.user;
    }

    isLoggedIn(): boolean {
        return this.loginService.isLoggedIn();
    }

    login() {
        this.loginService.handleLogin();
    }

    logout() {
        this.loginService.logout();
    }

}
