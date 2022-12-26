import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unregistered-user-navbar',
  templateUrl: './unregistered-user-navbar.component.html',
  styleUrls: ['./unregistered-user-navbar.component.css']
})
export class UnregisteredUserNavbarComponent {
  constructor(private router:Router) {}  
  toLogin() {
    this.router.navigate(['/login']);
  }
  toSignup() {
    this.router.navigate(['/signup']); 
  }
}
