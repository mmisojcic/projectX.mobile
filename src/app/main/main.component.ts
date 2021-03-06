import { Expense } from './../../models/expense.model';
import { UserCredentials } from './../../models/userCredentials.model';
import { User } from './../../models/user.model';
import {
	Component,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { Income } from '../../models/income.model';
import { PopupService } from './popup/popup.service';
import { NavigationService } from './../../services/navigation.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	providers: [PopupService]
})
// in every component we use userData or userCredentials we will implement OnChanges angular life cycle hook
export class MainComponent implements OnInit, OnChanges {
	// loadCategory = false;
	// loadBalance = false;
	// loadMainInput = false;
	// loadStatistics = false;
	// loadList = false;
	loadLogin = true;

	loadComponents = [true, false, false, false, false]; // 0-balance, 1-main-input, 2-list, 3-cats, 4-stats(follow main menu order)

	userCredentials: UserCredentials;
	userData: User;
	userExpenses: Expense[];
	userIncomes: Income[];
	// to use user data or userCredentials we need a @Input on that component (app-component provides the data)
	@Input()
	set _userData(value) {
		this.userData = value;
		if (this.userData) {
			if (this.userData.getBalance()) {
				this.hasBalance = true;
			}
		}
	}
	@Input()
	set _userCredentials(value) {
		this.userCredentials = value;
	}
	@Input()
	set _userExpenses(value) {
		this.userExpenses = value;
		if (this.userExpenses[0]) {
			this.hasExpenses = true;
		}
	}
	@Input()
	set _userIncomes(value) {
		this.userIncomes = value;
		if (this.userIncomes[0]) {
			this.hasIncomes = true;
		}
	}

	currentUser: User;
	showTransactions = false;

	// showSetup = false;

	showPopup = false;
	hasBalance = false;
	hasIncomes = false;
	hasExpenses = false;

	constructor(
		private popupService: PopupService,
		private navigationService: NavigationService
	) {}

	catchEmit(eventData) {
		this.showTransactions = eventData;
	}

	ngOnInit() {
		// in the console we can see that onInit userData is undefined. because it is called async
		console.log('onInit user data TEST', this.userData);
		this.popupService.open.subscribe((data: boolean) => {
			this.showPopup = data;
		});

		this.navigationService.loadValue.subscribe(data => {
			for (let i = 0; i < this.loadComponents.length; i++) {
				if (i === data.index) {
					this.loadComponents[i] = data.value;
				} else {
					this.loadComponents[i] = false;
				}
			}
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes._userData && changes._userData.currentValue) {
			// OnChanges is subscribed on the @Input and every time input gets new data it is called
			console.log('On changes', changes._userData.currentValue);
			// now we have up to date current user with the latest data...
			// EVERY TIME user is changed in the database, this will be triggered
		}

		if (changes._userCredentials && changes._userCredentials.currentValue) {
			console.log('On credentials changes');
			if (changes._userCredentials.currentValue.isNew) {
				console.log('On credentials changes is new');
				// this.showSetup = true;
				this.loadLogin = false;
				this.navigationService.showMenuButton.next(!this.loadLogin);
			} else {
				console.log('On credentials changes not new');
				// this.loadSetup = false;
				this.loadLogin = false;
				this.navigationService.showMenuButton.next(!this.loadLogin);
			}
		}
	}
}
