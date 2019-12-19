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

    public user(): User {
        return this.loginService.user;
    }

    public isLoggedIn(): boolean {
        return this.loginService.isLoggedIn();
    }

    public login() {
        this.loginService.handleLogin();
    }

    public logout() {
        this.loginService.logout();
    }

}
