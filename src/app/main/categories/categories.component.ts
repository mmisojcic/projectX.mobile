import { PopupData } from './../popup/popup.data';
import { config } from './../../../services/config';
import { User } from './../../../models/user.model';
import { Income } from './../../../models/income.model';
import { Expense } from './../../../models/expense.model';
import { DBService } from './../../../services/db.service';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter
} from '@angular/core';
import { PopupService } from '../popup/popup.service';
@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnChanges {
    @ViewChild('expInput')
    expInput: ElementRef;
    @ViewChild('incInput')
    incInput: ElementRef;

    user: User;
    expenses: Expense[];
    incomes: Income[];

    @Output()
    emitOnOpen: EventEmitter<any> = new EventEmitter();

    @Input()
    set userData(value) {
        this.user = value;
    }
    @Input()
    set userExpenses(value) {
        this.expenses = value;
    }
    @Input()
    set userIncomes(value) {
        this.incomes = value;
    }
    // values to display from this array for expsense categories
    expCategoryValuePairs = [];
    // values to display from this array for income categories
    incCategoryValuePairs = [];

    expBtnAddBoxShow = true;
    expAddBoxShow = false;

    incBtnAddBoxShow = true;
    incAddBoxShow = false;

    constructor(private db: DBService, private popupService: PopupService) {}

    // clearInputFields() {
    //     this.expInput.nativeElement.value = null;
    //     this.incInput.nativeElement.value = null;
    // }

    // get total money spent by Category
    totalExpByCat() {
        this.expCategoryValuePairs = [];
        // temporary array with all categories
        const tmpCatArr: string[] = this.user
            ? this.user.getCategoriesExp()
            : undefined;
        // loop through all categories
        if (tmpCatArr) {
            tmpCatArr.forEach(cat => {
                let catVal = 0;
                // loop through all expenses
                this.expenses.forEach(exp => {
                    // compare category values from tmpCatArr and expense array
                    if (cat === exp.getCategory()) {
                        // if true add all expense values(converted to positives) for current category
                        catVal += Math.abs(exp.getValue());
                    }
                });
                this.expCategoryValuePairs.push([cat, catVal]);
            });
        }
    }

    // get total money gained by Category
    totalIncByCat() {
        this.incCategoryValuePairs = [];
        // temporary array with all categories
        const tmpCatArr: string[] = this.user
            ? this.user.getCategoriesInc()
            : undefined;
        if (tmpCatArr) {
            // loop through all categories
            tmpCatArr.forEach(cat => {
                let catVal = 0;
                // loop through all expenses
                this.incomes.forEach(inc => {
                    // compare category values from tmpCatArr and expense array
                    if (cat === inc.getCategory()) {
                        // if true add all expense values(converted to positives) for current category
                        catVal += inc.getValue();
                    }
                });
                this.incCategoryValuePairs.push([cat, catVal]);
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.totalExpByCat();
        this.totalIncByCat();
    }

    ngOnInit() {}

    openAddBox(type: string) {
        if (type === 'expense') {
            this.expAddBoxShow = true;
            this.expBtnAddBoxShow = false;
        } else if (type === 'income') {
            this.incAddBoxShow = true;
            this.incBtnAddBoxShow = false;
        }
    }

    checkForDuplicate(value, type: string): boolean {
        // create temporary array with categories
        let tmpCatArray;
        if (type === 'expense') {
            tmpCatArray = this.user.getCategoriesExp();
            console.log(tmpCatArray);
        } else if (type === 'income') {
            this.user.getCategoriesInc() === undefined
                ? (tmpCatArray = [])
                : (tmpCatArray = this.user.getCategoriesInc());
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
        return catExists;
    }

    onAdd(value: string, type: string) {
        console.log(this.user);
        if (value) {
            if (this.user) {
                if (type === 'expense') {
                    // this.checkForDuplicate(value, type);
                    console.log(this.checkForDuplicate(value, type));
                    if (this.checkForDuplicate(value, type)) {
                        this.popupService.openPopup(
                            'Category exists',
                            'Category with that name exists. Please chose other name!'
                        );
                        this.expInput.nativeElement.value = null;
                    } else {
                        if (this.user.getCategoriesExp()) {
                            this.user
                                .getCategoriesExp()
                                .push(
                                    value[0].toUpperCase() +
                                        value.slice(1).toLowerCase()
                                );
                        } else {
                            this.user.setCategoriesExp([]);
                            this.user
                                .getCategoriesExp()
                                .push(
                                    value[0].toUpperCase() +
                                        value.slice(1).toLowerCase()
                                );
                        }
                    }
                } else if (type === 'income') {
                    if (this.checkForDuplicate(value, type)) {
                        this.popupService.openPopup(
                            'Category exists',
                            'Category with that name exists. Please chose other name!'
                        );
                        this.incInput.nativeElement.value = null;
                    } else {
                        if (this.user.getCategoriesInc()) {
                            this.user
                                .getCategoriesInc()
                                .push(
                                    value[0].toUpperCase() +
                                        value.slice(1).toLowerCase()
                                );
                        } else {
                            this.user.setCategoriesExp([]);
                            this.user
                                .getCategoriesInc()
                                .push(
                                    value[0].toUpperCase() +
                                        value.slice(1).toLowerCase()
                                );
                        }
                    }
                }
                this.db.updateItem<User>(
                    config.users_endpoint,
                    this.user.getId(),
                    this.user
                );
            }
        } else if (type === 'expense' && !value) {
            this.popupService.openPopup(
                'Value missing',
                'Please specify category name for Expense!'
            );
        } else if (type === 'income' && !value) {
            this.popupService.openPopup(
                'Value missing',
                'Please specify category name for Income!'
            );
        }
    }

    onFinish(type: string) {
        if (type === 'expense') {
            this.expAddBoxShow = false;
            this.expBtnAddBoxShow = true;
        } else if (type === 'income') {
            this.incAddBoxShow = false;
            this.incBtnAddBoxShow = true;
        }

        this.db.updateItem<User>(
            config.users_endpoint,
            this.user.getId(),
            this.user
        );
        // this.clearInputFields();
    }

    onRemove(cat: any, type: string) {
        // ovo moze mnoooooogo bolje, al sam lenj
        if (type === 'expense') {
            this.user
                .getCategoriesExp()
                .splice(this.user.getCategoriesExp().indexOf(cat), 1);
        } else if (type === 'income') {
            this.user
                .getCategoriesInc()
                .splice(this.user.getCategoriesInc().indexOf(cat), 1);
        }
        this.db.updateItem<User>(
            config.users_endpoint,
            this.user.getId(),
            this.user
        );
    }
}
