import {  PipeTransform, Pipe, Injectable } from '@angular/core';
import { ExpenseModel } from '../expenses/expense-model';

@Pipe({
    name: 'expenses', pure: false
})
export class DashboardExpensesPipe implements PipeTransform {
    transform(value: ExpenseModel[], args: any = null): any {
        return Object.keys(value)
    }
}

