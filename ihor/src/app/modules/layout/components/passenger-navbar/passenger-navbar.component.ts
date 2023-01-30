import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['./passenger-navbar.component.css']
})
export class PassengerNavbarComponent {
  public selectedPage: SelectedPage | undefined;
  public enumSP = SelectedPage;

  constructor(private router: Router, private  authService: AuthService) {
    this.toSchedule();
  }

  toSchedule() {
    this.selectedPage = SelectedPage.SCHEDULE;
    this.router.navigate(['/passenger']);
  }

  toInbox() {
    this.selectedPage = SelectedPage.INBOX;
    this.router.navigate(['/inbox']);
  }

  toHistory() {
    this.selectedPage = SelectedPage.HISTORY;
  }

  toProfile() {
    this.selectedPage = SelectedPage.PROFILE;
    this.router.navigate(['/passenger/profile']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.authService.setDefaultRole();
        this.router.navigate(['/login'])
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error.error);
        }
      },
    });
  }
}

enum SelectedPage {
  SCHEDULE, INBOX, HISTORY, PROFILE
}
