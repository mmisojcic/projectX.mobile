import { AppComponent } from './../app/app.component';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {
    currency: string;
    transform(money: number) {
        // insert some regex if number pattern then transform else return money
        // currency will be worked on, string literal for now
        this.currency = AppComponent.currency;
        // array of digits form given number
        let digits: string[];
        digits = Math.abs(money)
            .toString()
            .split('');
        // final array of formated number with dots to be converted to string
        const formatedDigits: string[] = [];
        let formatedMoney = '';
        if (digits[0] === '-') {
            digits.splice(0, 1);
            console.log(digits);
        }
        let dotPoint = digits.length - 1;
        for (let i = digits.length - 1; i > -1; i--) {
            if (i === dotPoint - 3) {
                formatedDigits.unshift(digits[i] + '.');
                dotPoint -= 3;
            } else {
                formatedDigits.unshift(digits[i]);
            }
        }
        // create final string joining elements of formatedDigits array
        formatedMoney = this.currency + formatedDigits.join('');
        return formatedMoney;
    }
}
