import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['./passenger-navbar.component.css']
})
export class PassengerNavbarComponent {
  public selectedPage!: SelectedPage;
  public enumSP = SelectedPage;

  constructor(private router: Router, private authService: AuthService) {
    this.toSchedule();
    this.authService.setUser();
  }

  toSchedule() {
    this.selectedPage = SelectedPage.SCHEDULE;
    console.log("toschedule");
    this.router.navigate(['/passenger']);
  }

  toInbox() {
    console.log("inbox");
    this.selectedPage = SelectedPage.INBOX;
    this.router.navigate(['/inbox']);
  }

  toHistory() {
    console.log("hist");
    this.selectedPage = SelectedPage.HISTORY;
    this.router.navigate(['/passenger/history']);
  }

  toProfile() {
    console.log("profile");
    this.selectedPage = SelectedPage.PROFILE;
    this.router.navigate(['/passenger/profile']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  toCurrentRide() {
    this.selectedPage = SelectedPage.CURRENT_RIDE;
    this.router.navigate(['/current-ride'])
  }

  toStats() {
    this.selectedPage = SelectedPage.STATS;
    const id = this.authService.getId();
    this.router.navigate(['/statistics/passenger/' + id.toString()]);
  }
}

enum SelectedPage {
  CURRENT_RIDE, SCHEDULE, INBOX, HISTORY, STATS, PROFILE
}
