import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseModel } from '../expenses/expense-model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  expense = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  month = 'January';
  dates = [];

  constructor(
    private expenseService: ExpenseService,
  ) { }

  ngOnInit() {
    this.expenseService.getProfileExpenses().subscribe(profile => {
      this.expense = profile.user;
      console.log('DDDDDDDDDD', this.expense);
    });
  }
  expenseByMonth() {
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

  }

}




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
    
    