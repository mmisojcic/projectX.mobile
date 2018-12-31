import { Expense } from './../models/expense.model';
import { config } from './../services/config';
import { Income } from './../models/income.model';
import { User } from './../models/user.model';
import { throwError } from 'rxjs';
export class Converter {
    constructor() {}

    static modelToJson<T>(model: T): JSON {
        let json;
        if (model) {
            if (model instanceof User) {
                json = {
                    id: model.getId()
                        ? model.getId()
                        : throwError(console.error),
                    name: model.getName() ? model.getName() : null,
                    password: model.getPassword() ? model.getPassword() : null,
                    email: model.getEmail() ? model.getEmail() : null,
                    language: model.getLanguage() ? model.getLanguage() : null,
                    theme: model.getTheme() ? model.getTheme() : null,
                    settings: model.getSettings() ? model.getSettings() : null,
                    totalInc: model.getTotalInc() ? model.getTotalInc() : null,
                    totalExp: model.getTotalExp() ? model.getTotalExp() : null,
                    balance: model.getBalance() ? model.getBalance() : null,
                    categoriesExp: model.getCategoriesExp()
                        ? model.getCategoriesExp()
                        : null,
                    categoriesInc: model.getCategoriesInc()
                        ? model.getCategoriesInc()
                        : null,
                    incomeRefs: model.getIncomeRefs()
                        ? model.getIncomeRefs()
                        : null,
                    expenseRefs: model.getExpenseRefs()
                        ? model.getExpenseRefs()
                        : null
                };
                return json;
            } else if (model instanceof Income) {
                json = {
                    name: model.getName() ? model.getName() : null,
                    value: model.getValue() ? model.getValue() : null,
                    category: model.getCategory() ? model.getCategory() : null,
                    timeStamp: model.getTimeStamp()
                        ? model.getTimeStamp()
                        : null,
                    userId: model.getUserId() ? model.getUserId() : null
                };
                return json;
            } else if (model instanceof Expense) {
                console.log('inconverter');
                json = {
                    name: model.getName() ? model.getName() : null,
                    value: model.getValue() ? model.getValue() : null,
                    category: model.getCategory() ? model.getCategory() : null,
                    timeStamp: model.getTimeStamp()
                        ? model.getTimeStamp()
                        : null,
                    userId: model.getUserId() ? model.getUserId() : null
                };
                return json;
            }
        }
    }

    static modelToJsonList<T>(models: T[]): JSON[] {
        const json = [];
        models.forEach(model => {
            json.push(this.modelToJson(model));
        });
        return json;
    }

    static jsonToModel(json: any, endpoint: string) {
        if (json) {
            if (endpoint === config.users_endpoint) {
                return new User(
                    json.id ? json.id : throwError(console.error),
                    json.name ? json.name : undefined,
                    json.password ? json.password : undefined,
                    json.email ? json.password : undefined,
                    json.language ? json.language : undefined,
                    json.theme ? json.theme : undefined,
                    json.settings ? json.settings : undefined,
                    json.totalInc ? json.totalInc : undefined,
                    json.totalExp ? json.totalExp : undefined,
                    json.balance ? json.balance : undefined,
                    json.categoriesExp ? json.categoriesExp : undefined,
                    json.categoriesInc ? json.categoriesInc : undefined,
                    json.incomeRefs ? json.incomeRefs : undefined,
                    json.expenseRefs ? json.expenseRefs : undefined
                );
            } else if (endpoint === config.incomes_endpoint) {
                return new Income(
                    json.name ? json.name : undefined,
                    json.value ? json.value : undefined,
                    json.category ? json.category : undefined,
                    json.timeStamp ? new Date(json.timeStamp.seconds * 1000) : undefined,
                    json.userId ? json.userId : undefined
                );
            } else if (endpoint === config.expenses_endpoint) {
                return new Expense(
                    json.name ? json.name : undefined,
                    json.value ? json.value : undefined,
                    json.category ? json.category : undefined,
                    json.timeStamp ? new Date(json.timeStamp.seconds * 1000) : undefined,
                    json.userId ? json.userId : undefined
                );
            }
        }
    }

    static jsonToModelList(json: any[], endpoint: string) {
        const models = [];
        json.forEach(el => {
            models.push(this.jsonToModel(el.data(), endpoint));
        });
        return models;
    }
}
