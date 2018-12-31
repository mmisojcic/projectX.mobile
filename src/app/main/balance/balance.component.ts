import { Income } from './../../../models/income.model';
import { Expense } from './../../../models/expense.model';
import { User } from './../../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';

enum TIME_FRAME {
    month = 'TIME_DATE.30_DAYS',
    week = 'TIME_DATE.7_DAYS',
    tenDays = 'TIME_DATE.10_DAYS'
}
@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

    date: Date;

    user: User;
    @Input()
    set userData(value) {
        this.user = value;
        this.money = this.user ? this.user.getBalance() : undefined;
    }

    @Input()
    set userExpenses(value) {
        this.money = 0;

        value.forEach((el) => {
        if (el.getTimeStamp() > this.getPastMonth()) {
                this.money += el.getValue();
            }
        });
    }

    @Input()
    set userIncomes(value) {
        this.money = 0;

        value.forEach((el) => {
        if (el.getTimeStamp() > this.getPastMonth()) {
            this.money += el.getValue();
            }
        });
    }
    @Input()
    title = 'LABEL.BALANCE_CURRENT';
    @Input()
    dataToDisplay = 'balance';
    @Input()
    showDatePicker: boolean;

    color: string;
    money = 0;
    timeFrame = '';

    constructor() {}

    getPastMonth() {
        // znaci date 30 dana unazad nek prestavlja to mesec
        this.date = new Date();
        this.date.setDate(this.date.getDate() - 30);
        // const dateString = date.toISOString().split('T')[0];
        return this.date;
    }

    ngOnInit() {
        this.getPastMonth();
        if (this.dataToDisplay !== 'balance') {
             this.timeFrame = TIME_FRAME.month;

            if (this.dataToDisplay === 'expenses') {
                this.title = 'LABEL.SPENT_THIS';
                this.color = 'red';
            }

            if (this.dataToDisplay === 'incomes') {
                this.title = 'LABEL.EARNED_THIS';
                this.color = 'blue';
            }

        } else {
            this.money = this.user ? this.user.getBalance() : undefined;
        }
    }
}
