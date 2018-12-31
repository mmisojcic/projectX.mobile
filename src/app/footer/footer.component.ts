import { auth } from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input() signOutShow: boolean;

    constructor(public translate: TranslateService) {}

    onSignOUt() {
        auth()
            .signOut()
            .then(function() {
                console.log('User sign-OUT method called!');
            })
            .catch(function(error) {
                console.log('Error happened while singing OUT!', error);
            });
        window.location.reload();
    }

    ngOnInit() {}

    onEn() {
        this.translate.use('en');
    }
    onSr() {
        this.translate.use('sr');
    }

}
