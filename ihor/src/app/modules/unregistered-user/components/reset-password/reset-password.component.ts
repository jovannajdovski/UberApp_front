import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';
import { match } from '../signup-form/signup-form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ResetService } from '../../services/reset/reset.service';
import { ResetPasswordDTO } from '../../model/ResetPasswordDTO';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hasError: boolean;
  token: string;
  id: number;
  hidePassword = true;
  hideConfirmPassword = true;

  reset = new FormGroup({
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: [match('password', 'confirmPassword')] });


  constructor(private router: Router,
    private route: ActivatedRoute,
    private resetService: ResetService) {
    this.token = '';
    this.id = 0;
    this.hasError = false;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];
        this.id = params['id'];
      }
    );
  }

  toChange() {
    if (this.reset.valid) {
      const resetPasswordDTO: ResetPasswordDTO = {
        code : this.token,
        newPassword: this.reset.value.password as string
      }
      this.resetService.changePasswordWithResetCode(this.id, resetPasswordDTO).subscribe({
        next: (result) => {
          this.router.navigate(['/password-changed']);
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
