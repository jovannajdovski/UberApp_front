import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-no-current-ride',
  templateUrl: './no-current-ride.component.html',
  styleUrls: ['./no-current-ride.component.css']
})
export class NoCurrentRideComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  rideOrdered = 0;

  toHomePage() {
    const role = this.authService.getRole();
    this.router.navigate(['/' + role.toLowerCase()]);
  }
}
