import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent {

  constructor(private router: Router) { }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
