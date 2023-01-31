import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-money-spent',
  templateUrl: './dashboard-money-spent.component.html',
  styleUrls: ['./dashboard-money-spent.component.css']
})
export class DashboardMoneySpentComponent {
  sumValue = "0";
  avgValue = "0";

  constructor() {}
}
