import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ResetService} from '../../services/reset/reset.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  hasError = false;

  forgot = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });


  constructor(private router: Router,
              private resetService: ResetService) {
  }

  toReset() {
    if (this.forgot.valid) {
      const email: string = this.forgot.value.email as string;

      this.resetService.checkPassengerByEmail(email).subscribe({
        next: (result) => {

          const id: number = result.id;

          this.resetService.sendResetCodeToEmail(id).subscribe({
            next: (result) => {
              this.router.navigate(['/email-for-forgot-password']);
            },
            error: (error) => {
              if (error instanceof HttpErrorResponse) {
                this.hasError = true;
              }
            },
          });
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
