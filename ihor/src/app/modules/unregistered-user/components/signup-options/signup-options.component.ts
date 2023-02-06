import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-options',
  templateUrl: './signup-options.component.html',
  styleUrls: ['./signup-options.component.css']
})
export class SignupOptionsComponent {
  @Output() signUpWithEmailEvent = new EventEmitter();

  constructor(private router: Router) {
  }

  signUpWithEmail() {
    this.signUpWithEmailEvent.emit();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
