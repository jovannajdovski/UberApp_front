import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-administrator-navbar',
  templateUrl: './administrator-navbar.component.html',
  styleUrls: ['./administrator-navbar.component.css']
})
export class AdministratorNavbarComponent {
  public selectedPage: SelectedPage | undefined;
  public enumSP = SelectedPage;

  constructor(private router: Router, private authService: AuthService) {
    this.toHome();
  }

  toHome() {
    this.selectedPage = SelectedPage.HOME;
    this.router.navigate(['/administrator']);
  }

  toInbox() {
    this.selectedPage = SelectedPage.INBOX;
    this.router.navigate(['/inbox']);
  }

  toHistory() {
    this.selectedPage = SelectedPage.HISTORY;
  }

  toUsers() {
    this.selectedPage = SelectedPage.USERS;
    this.router.navigate(['/administrator/drivers']);
  }

  toProfile() {
    this.selectedPage = SelectedPage.PROFILE;
    this.router.navigate(['/administrator/profile']);
  }

  logout() {
    localStorage.clear();
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.authService.setDefaultRole();
        this.router.navigate(['/login'])
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
        }
      },
    });
  }
}

enum SelectedPage {
  HOME, INBOX, HISTORY, USERS, PROFILE
}
