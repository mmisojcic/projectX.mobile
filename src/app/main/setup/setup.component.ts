import { PopupData } from './../popup/popup.data';
import { User } from './../../../models/user.model';
import { DBService } from './../../../services/db.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UserCredentials } from '../../../models/userCredentials.model';
import { config } from '../../../services/config';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
    @Input()
    userData: User;
    balanceStep = new HelperModel('INPUT.SETUP_BALANCE', 0, false);
    incomeStep = new HelperModel('INPUT.SETUP_INCOME', 1, false);
    expenseStep = new HelperModel('INPUT.SETUP_EXPENSE', 2, false);
    timeStep = new HelperModel('INPUT.SETUP_TIME_FRAME', 3, false);
    currentStep: HelperModel;
    steps: HelperModel[] = [
        this.balanceStep,
        this.incomeStep,
        this.expenseStep,
        this.timeStep
    ];
    end: boolean;
    added: boolean;
    inputText = '';
    btnNextText = 'BUTTON.NEXT';
    btnNextShow = true;
    btnAddText = 'BUTTON.ADD';
    btnAddShow = false;
    finished = false;
    btnBackText = 'BUTTON.BACK';
    btnEndText = 'BUTTON.SKIP';
    hideInput = false;

    tables: HelperModel[] = [];

    @ViewChild('input')
    input: ElementRef;

    popupData: PopupData;
    showPopup = false;

    constructor(public db: DBService) {}

    PopupEventTriggered(data) {
        this.showPopup = data;
    }

    clearInputFields() {
        this.input.nativeElement.value = null;
    }

    ngOnInit() {
        this.currentStep = this.steps[0];
        this.inputText = this.currentStep.name;
        this.tables = [
            new HelperModel('LABEL.BALANCE', []),
            new HelperModel('LABEL.COMMON_INCOMES', []),
            new HelperModel('LABEL.COMMON_EXPENSES', []),
            new HelperModel('LABEL.DEFAULT_TIME_FRAME', [
                'TIME_DATE.DAY',
                'TIME_DATE.WEEK',
                'TIME_DATE.MONTH',
                'TIME_DATE.YEAR'
            ])
        ];
    }

    nextStep() {
        this.clearInputFields();
        if (this.currentStep.value !== 3) {
            this.currentStep = this.steps[this.currentStep.value + 1];
            this.inputText = this.currentStep.name;
        } else {
            // in the last step, take all of the data and send it to be
            this.btnNextShow = false;
            this.btnAddShow = false;
            this.hideInput = true;
            this.finished = true;
            this.btnEndText = 'BUTTON.END';
            this.userData.setCategoriesExp(this.tables[2].value);
            this.userData.setCategoriesInc(this.tables[1].value);
            this.userData.setBalance(this.tables[0].value);
            this.userData.setSettings(undefined); //  TODO: see about this...
            this.db.updateItem<User>(
                config.users_endpoint,
                this.userData.getId(),
                this.userData
            );
        }
    }
    previousStep() {
        if (this.currentStep.value !== 0) {
            this.currentStep = this.steps[this.currentStep.value - 1];
            this.inputText = this.currentStep.name;
            this.btnNextShow = true;
            if (this.currentStep.value === 0) {
                this.btnAddShow = false;
                this.tables[0] = new HelperModel('LABEL.BALANCE', []);
            } else {
                this.btnAddShow = true;
            }
        }
    }

    onBack() {
        // if first step just reload app for now. later maybe make this go to some other route
        if (this.currentStep === this.steps[0]) {
            window.location.reload();
        }
        this.previousStep();
    }

    onNext(input: any) {
        if (input || this.added) {
            // cleaner code
            for (let i = 0; i < this.steps.length; i++) {
                if (this.currentStep === this.steps[i]) {
                    this.tables[i].isShown = true;
                    this.tables[i].value.push(input);
                    this.btnAddShow = true;
                } else if (this.currentStep === this.steps[3]) {
                    // TODO
                    this.tables[3].isShown = true;
                }
            }
            this.nextStep();
            this.added = false;
        } else {
            // TODO: remove and place a warning msg for the user
            this.popupData = new PopupData(
                'Value missing',
                'Please specify value!'
            );
            this.showPopup = true;
        }
    }

    onAdd(input: any) {
        if (input || this.added) {
            if (this.currentStep === this.steps[1]) {
                this.tables[1].isShown = true;
                this.tables[1].value.push(input);
            } else if (this.currentStep === this.steps[2]) {
                this.tables[2].isShown = true;
                this.tables[2].value.push(input);
            }
            this.added = true;
            this.clearInputFields();
        } else {
            // TODO: remove and place a warning msg for the user
            this.popupData = new PopupData(
                'Value missing',
                'Please specify value!'
            );
            this.showPopup = true;
        }
    }

    onSkip() {
        // TODO: remove this
        if (this.currentStep.value === 3) {
            window.location.reload();
        }
    }
}

export class HelperModel {
    constructor(
        public name?: any,
        public value?: any,
        public isShown = false
    ) {}
}
