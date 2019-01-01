import { Component, OnInit, Input } from '@angular/core';
// import { Expense } from 'src/models/expense.model';
// import { Income } from 'src/models/income.model';
// import { User } from 'src/models/user.model';

@Component({
	selector: 'app-balance-all',
	templateUrl: './balance-all.component.html',
	styleUrls: ['./balance-all.component.scss']
})
export class BalanceAllComponent implements OnInit {
	// userData: User;
	// userExpenses: Expense[];
	// userIncomes: Income[];

	// @Input()
	// set _userData(value) {
	// 	this.userData = value;
	// 	if (this.userData) {
	// 		if (this.userData.getBalance()) {
	// 			this.hasBalance = true;
	// 		}
	// 	}
	// }
	// @Input()
	// set _userExpenses(value) {
	// 	this.userExpenses = value;
	// 	if (this.userExpenses[0]) {
	// 		this.hasExpenses = true;
	// 	}
	// }
	// @Input()
	// set _userIncomes(value) {
	// 	this.userIncomes = value;
	// 	if (this.userIncomes[0]) {
	// 		this.hasIncomes = true;
	// 	}
	// }

	// hasBalance = false;
	// hasIncomes = false;
	// hasExpenses = false;

	constructor() {}

	ngOnInit() {}
}
