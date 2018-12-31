import { PopupData } from './../popup/popup.data';
import { config } from './../../../services/config';
import { DBService } from './../../../services/db.service';
import { User } from '../../../models/user.model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Income } from '../../../models/income.model';
import { Expense } from '../../../models/expense.model';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'app-main-input',
    templateUrl: './main-input.component.html',
    styleUrls: ['./main-input.component.scss']
})
export class MainInputComponent implements OnInit {
    @Input()
    userData: User;
    expDropIsHidden = true;
    incDropIsHidden = true;
    newCategoryCtrl = true;
    @ViewChild('expCategory')
    expCategory: ElementRef;
    @ViewChild('incCategory')
    incCategory: ElementRef;
    @ViewChild('incName')
    incName: ElementRef;
    @ViewChild('incValue')
    incValue: ElementRef;
    @ViewChild('expName')
    expName: ElementRef;
    @ViewChild('expValue')
    expValue: ElementRef;

    incCatClicked = false;
    expCatClicked = false;

    constructor(public db: DBService, private popupService: PopupService) {}

    clearInputFields() {
        this.incName.nativeElement.value = null;
        this.incValue.nativeElement.value = null;
        this.expName.nativeElement.value = null;
        this.expValue.nativeElement.value = null;
        this.expCategory.nativeElement.value = null;
        // this.incCategory.nativeElement.value = null;
    }

    ngOnInit() {}

    onIncomeAddClick(inc: any, name: any, value: any) {
        console.log('inc: any, name: any, value: any', inc, name, value);
        // if (this.incCatClicked) {
        if (value) {
            // kreireaj nov income i pretvori vrednos u pozitivnu vrednost
            const newIncome = new Income(
                name,
                parseFloat(value.toString()),
                inc,
                new Date(),
                this.userData.getId()
            );
            this.db.addItem<Income>(
                config.incomes_endpoint,
                newIncome,
                undefined,
                this.userData.getId()
            );

            // updejtuj userData
            this.db.updateItem<User>(
                config.users_endpoint,
                this.userData.getId(),
                this.userData
            );
            this.incDropIsHidden = true;
            this.incCatClicked = false;
            // calc balance
            this.calculateBalance();

            this.clearInputFields();
        } else {
            this.popupService.openPopup(
                'Value missing',
                'Please specify value!'
            );
        }
    }

    onExpenseAddClick(exp: any, name: any, value: any) {
        // if (this.expCatClicked) {
        // ako postoji value u inputu
        if (value) {
            // kreiraj novi expens i stavi minus ispred vrednosti i pretvori je u number
            const newExpense = new Expense(
                name,
                parseFloat('-' + value.toString()),
                exp,
                new Date(),
                this.userData.getId()
            );
            // odaj ga u bazu
            this.db.addItem<Expense>(
                config.expenses_endpoint,
                newExpense,
                undefined,
                this.userData.getId()
            );

            // updejtuj userData
            this.db.updateItem<User>(
                config.users_endpoint,
                this.userData.getId(),
                this.userData
            );
            this.expDropIsHidden = true;
            this.expCatClicked = false;
            // calc balance
            this.calculateBalance();

            this.clearInputFields();
        } else {
            this.popupService.openPopup(
                'Value missing',
                'Please specify value!'
            );
        }
        // } else {
        //     this.expCatClicked = true;
        // }
    }

    newCategoryAdd(value: any, type: string) {
        // if users chose new category
        if (value) {
            // create temporary array with categories
            let tmpCatArray;
            if (type === 'Expense') {
                this.userData.getCategoriesExp() === undefined
                    ? (tmpCatArray = [])
                    : (tmpCatArray = this.userData.getCategoriesExp());
            } else if (type === 'Income') {
                this.userData.getCategoriesInc() === undefined
                    ? (tmpCatArray = [])
                    : (tmpCatArray = this.userData.getCategoriesInc());
            }

            // always format to upper case 1st letter and lower case the rest of the string
            // so we can have nice category name and also prevent user from adding categories
            // with same name but different letter case
            const cat = value[0].toUpperCase() + value.slice(1).toLowerCase();
            // check if category exsists
            let catExists = false;
            tmpCatArray.forEach(el => {
                if (el === cat) {
                    catExists = true;
                }
            });

            if (catExists) {
                // if YES
                this.popupService.openPopup(
                    'Category exists',
                    'Category with that name exists. Please chose other name!'
                );
            } else {
                // if NO
                // push new category to tmpCatArray
                tmpCatArray.push(cat);
                // add tmpCatArrar to model
                if (type === 'Expense') {
                    this.userData.setCategoriesExp(tmpCatArray);
                    this.expCategory.nativeElement.value = null;
                } else if (type === 'Income') {
                    this.userData.setCategoriesInc(tmpCatArray);
                    this.incCategory.nativeElement.value = null;
                }
                // hide new Category Controls
                this.newCategoryCtrl = true;
                // updejtuj userData
                // this.db.updateItem<User>(
                //     config.users_endpoint,
                //     this.userData.getId(),
                //     this.userData
                // );
                // todo lemi
                if (type === 'Expense') {
                    console.log(cat, this.expName, this.expValue);
                    this.onExpenseAddClick(
                        cat,
                        this.expName.nativeElement.value,
                        this.expValue.nativeElement.value
                    );
                } else if (type === 'Income') {
                    this.onIncomeAddClick(
                        cat,
                        this.incName.nativeElement.value,
                        this.incValue.nativeElement.value
                    );
                }
            }
        } else {
            this.popupService.openPopup(
                'Value missing',
                'Please specify category name!'
            );
        }
    }

    newCategory() {
        this.newCategoryCtrl
            ? (this.newCategoryCtrl = false)
            : (this.newCategoryCtrl = true);
        this.expCategory.nativeElement.value = null;
        this.incCategory.nativeElement.value = null;
    }

    onCategorise(type: string) {
        if (type === 'inc') {
            this.incCatClicked = !this.incCatClicked;
        } else if (type === 'exp') {
            this.expCatClicked = !this.expCatClicked;
        }
    }

    onIncBtn() {
        if (!this.incDropIsHidden) {
            this.clearInputFields();
        }
        this.incDropIsHidden = !this.incDropIsHidden;
        this.expDropIsHidden = true;
        this.newCategoryCtrl = true;
        this.incCatClicked = false;
    }

    onExpBtn() {
        if (!this.expDropIsHidden) {
            this.clearInputFields();
        }
        this.expDropIsHidden = !this.expDropIsHidden;
        this.incDropIsHidden = true;
        this.newCategoryCtrl = true;
        this.expCatClicked = false;
    }

    onBackdropClick() {
        this.expDropIsHidden = true;
        this.newCategoryCtrl = true;
        this.incCatClicked = false;

        this.expDropIsHidden = true;
        this.incDropIsHidden = true;
        this.newCategoryCtrl = true;
        this.expCatClicked = false;
    }

    calculateBalance() {
        this.db.joinIncomeAndExpens(this.userData.getId()).subscribe(res => {
            // add them into one arr
            const data = [];
            res[0].forEach(incEl => {
                data.push(incEl.data()['value']);
            });
            res[1].forEach(expEl => {
                data.push(expEl.data()['value']);
            });
            // add them
            let total = 0;
            data.forEach(el => {
                total += el;
            });
            // update user balance
            this.db
                .getDocRef(config.users_endpoint, this.userData.getId())
                .update({
                    balance: total
                });
        });
    }
}
