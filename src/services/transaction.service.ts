import { Expense } from './../models/expense.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Income } from '../models/income.model';

@Injectable()
export class TransactionService {
    constructor() {}

    getAllUserIncomes(user: User): Income[] {
        return undefined;
    }

    getAllUserExpences(user: User): Expense[] {
        return undefined;
    }
}
