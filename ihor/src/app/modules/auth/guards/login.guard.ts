import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      const role = this.auth.getRole();
      switch (role) {
        case ("PASSENGER"):
          this.router.navigate(['/passenger']);
          return false;
        case ("DRIVER"):
          this.router.navigate(['/driver']);
          return false;
        case ("ADMINISTRATOR"):
          this.router.navigate(['/administrator']);
          return false;
      }
    }
    return true;
  }
}
