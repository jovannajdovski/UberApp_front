import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['expectedRoles'].split('|', 3);
    const role = this.auth.getRole();

    if (expectedRoles.indexOf(role) === -1) {
      switch (role) {
        case ("PASSENGER"):
          this.router.navigate(['/passenger']);
          return false;
        case ("DRIVER"):
          this.router.navigate(['/driver']);
          return false;
        case ("ADMIN"):
          this.router.navigate(['/administrator']);
          return false;
      }
    }

    return true;
  }

}
