import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseModel } from '../expenses/expense-model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  expense = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  month = '';
  dates = [];
  sortedByMonth = [];
  years = [];
  year = '';
  sortedByYears = [];
  yearsToBeSorted = [];
  sortedYears = [];
  noDupe = [];

  constructor(
    private expenseService: ExpenseService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.expenseService.getProfileExpenses().subscribe(profile => {
      this.expense = profile.user;
      this.yearsInOrder();
      this.sortedYears = this.yearsToBeSorted.sort();
      this.noDupe = Array.from(new Set(this.sortedYears))
      console.log('no duplicates...hhopefully', this.noDupe);
    });
  }

  yearsInOrder() {
    for (let i = 0; i < this.expense.length; i++) {
      this.yearsToBeSorted.push(this.expense[i].date.slice(0, 4));
    }
  }

  expenseByMonth() {
    this.sortedByMonth = [];
    for (let i = 0; i < this.months.length; i++) {
      if (this.month == this.months[i]) {
        let monthNumber = i + 1;
        for (let expenseIndex = 0; expenseIndex < this.expense.length; expenseIndex++) {
          if (monthNumber == this.expense[expenseIndex].date.slice(5, 7)) {
            this.sortedByMonth.push(this.expense[expenseIndex])
            console.log(this.sortedByMonth)              
          }
        } 
      } 
    } 
    if (this.sortedByMonth.length < 1) {
      this.flashMessage.show('No expenses for this month', {cssClass: 'alert-warning', timeout: 5500});
    }
  }

  expenseByYear() {
    this.sortedByYears = [];
    for (let i = 0; i < this.expense.length; i++) {
      if (this.years == this.expense[i]) {

      }
    }
  }
}
    
    
    /*
    let monthNumber;
    console.log('GGGGGGG', monthNumber);
    for (let expenseIndex = 0; expenseIndex < this.expense.length; expenseIndex++) {
      let cutMonth = this.expense[expenseIndex].date.slice(5, 7);
      console.log('333333333', cutMonth);
      
    }
    for (let i = 0; i < this.months.length; i++) {
      if (this.month === this.months[i]) {
        monthNumber = i + 1;
        console.log('HHHHH',monthNumber);
      }
      return monthNumber;
    }

  }  */





  /*
    // lineChart
    public lineChartData = this.expense;
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType:string = 'line';
    public pieChartType:string = 'pie';
   
    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];
    
    public randomizeType():void {
      this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
      this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    }
    
    public chartClicked(e:any):void {
      console.log(e);
    }
    
    public chartHovered(e:any):void {
      console.log(e);
    }
    */
    
    