import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../../services/login.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private loginService: LoginService) {
        loginService.startLogInUI();
    }
    ngOnInit() {}

    anonLogin(): Promise<any> {
        return firebase
            .auth()
            .signInAnonymously()
            .then(resp => {
                console.log(resp);
            });
    }
}
