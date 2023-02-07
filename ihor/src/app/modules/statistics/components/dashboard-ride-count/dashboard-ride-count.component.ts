import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-ride-count',
  templateUrl: './dashboard-ride-count.component.html',
  styleUrls: ['./dashboard-ride-count.component.css']
})
export class DashboardRideCountComponent {
  sumValue = "0";
  avgValue = "0";

  constructor() {
  }
}
