import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/modules/auth/services/auth.service';
import {RideNoStatusDTO} from 'src/app/modules/history/model/RidePageListDTO';
import {RideHistoryService} from 'src/app/modules/history/services/ride-history/ride-history.service';

@Component({
  selector: 'app-current-ride-finished',
  templateUrl: './current-ride-finished.component.html',
  styleUrls: ['./current-ride-finished.component.css']
})
export class CurrentRideFinishedComponent implements OnInit {
  @Input() rideNoStatus!: RideNoStatusDTO;

  constructor(private router: Router, private authService: AuthService, private rideHistoryService: RideHistoryService) {

  }

  role = "";

  ngOnInit() {
    this.role = this.authService.getRole()
  }

  toHomePage() {
    const role = this.authService.getRole();
    this.router.navigate(['/' + role.toLowerCase()]);
  }

  leaveReview() {
    this.rideHistoryService.setSettedRide(this.rideNoStatus)
    this.router.navigate(['/leave-review'])
  }
}
