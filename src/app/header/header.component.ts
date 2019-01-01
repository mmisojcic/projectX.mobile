import { AppComponent } from './../app.component';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { auth } from 'firebase/app';
import { UserCredentials } from '../../models/userCredentials.model';
import {
	trigger,
	state,
	style,
	animate,
	transition
	// ...
} from '@angular/animations';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('openCloseMenu', [
			// ...
			state(
				'open',
				style({
					transform: 'translateX(100%)',
					opacity: 0
				})
			),
			state(
				'closed',
				style({
					transform: 'translateX(0)',
					opacity: 1
				})
			),
			transition('open => closed', [animate('0.3s')]),
			transition('closed => open', [animate('0.3s')])
		])
	]
})
export class HeaderComponent implements OnInit {
	state = 'open';
	menuBtn = '&#9776;';

	@Input()
	userData: User;
	@Input()
	userCredentials: UserCredentials;
	@Input()
	signOutShow = false;
	constructor(public translate: TranslateService) {}

	onSignOut() {
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
	toggleState() {
		this.state === 'open' ? (this.state = 'closed') : (this.state = 'open');
	}
	ngOnInit() {}

	onEn() {
		this.translate.use('en');
	}
	onSr() {
		this.translate.use('sr');
	}
}
