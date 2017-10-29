import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  expense = [];

  constructor(
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.expenseService.getOneExpense().subscribe(expense => {
      this.expense = expense.user;
    });
  }
}
