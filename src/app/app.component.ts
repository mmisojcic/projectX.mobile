import { Converter } from './../converters/converter';
import { config } from './../services/config';
import { User } from './../models/user.model';
import { UserCredentials } from './../models/userCredentials.model';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DBService } from './../services/db.service';

declare var device;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public static currency: string;
	currUserData: any;
	currUserCredentials: UserCredentials;
	currUserExpenses: any[] = [];
	currUserIncomes: any[] = [];

	hasBalance = false;
	hasIncomes = false;
	hasExpenses = false;

	constructor(
		public db: DBService,
		translate: TranslateService,
		private loginService: LoginService
	) {
		translate.setDefaultLang('en');
		translate.use('en');

		// TODO: fix this and see about its implementation
		if (translate.defaultLang === 'en') {
			AppComponent.currency = '$';
		} else {
			AppComponent.currency = 'din';
		}
	}

	signOutVal(): boolean {
		if (this.currUserCredentials) {
			return true;
		}
	}

	ngOnInit() {
		// document.addEventListener(
		// 	'deviceready',
		// 	function() {
		// 		alert(device.platform);
		// 	},
		// 	false
		// );

		// 1. LOG IN user
		this.loginService.userCredentials.subscribe(res => {
			if (res) {
				console.log('changed user credenttials, ', res);
				this.currUserCredentials = res;
				// 2. get userData from be
				this.db
					.getSpecificItem(
						config.users_endpoint,
						this.currUserCredentials.uid
					)
					.subscribe(
						// -- userData --
						userData => {
							// if there is data this meands that the user is not a new user
							if (userData.payload.data()) {
								this.currUserData = Converter.jsonToModel(
									userData.payload.data(),
									config.users_endpoint
								);
								if (this.currUserData.getBalance()) {
									this.hasBalance = true;
								}

								this.currUserCredentials.isNew = false;
								// get all incomes and expenses from user
								this.db
									.getAllValues(
										config.incomes_endpoint,
										this.currUserData.getId()
									)
									.subscribe(
										incomes => {
											this.currUserIncomes = Converter.jsonToModelList(
												incomes,
												config.incomes_endpoint
											);
											if (this.currUserIncomes[0]) {
												this.hasIncomes = true;
											}
										},
										err => {
											console.error(err);
										}
									);
								this.db
									.getAllValues(
										config.expenses_endpoint,
										this.currUserData.getId()
									)
									.subscribe(
										expenses => {
											this.currUserExpenses = Converter.jsonToModelList(
												expenses,
												config.expenses_endpoint
											);
											if (this.currUserExpenses[0]) {
												this.hasExpenses = true;
											}
										},
										err => {
											console.error(err);
										}
									);
							} else {
								// no data? so its a new user. we need to create his userData
								const newUser = new User(
									this.currUserCredentials.uid
								);
								this.db.addItem<User>(
									config.users_endpoint,
									newUser,
									newUser.getId()
								);
								this.currUserCredentials.isNew = true;
							}
							// setTimeout(() => {
							//     this.db.updateItem<User>(
							//         config.users_endpoint,
							//         this.currUserCredentials.uid,
							//         this.mockUser(this.currUserCredentials.uid)
							//     );
							// }, 5000);
						},
						err => {
							console.error(
								'there was an error in getting the userData',
								err
							);
						}
					);
			}
		});
	}

	mockUser(id: string) {
		const mock = new User(id);
		mock.setBalance(12345);

		return mock;
	}
}
