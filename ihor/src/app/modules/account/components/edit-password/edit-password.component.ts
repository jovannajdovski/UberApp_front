import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent {

  hideCurrPassword = true;
  hidePassword = true;
  hideConfirmPassword = true;

  currPassword = '';
  newPassword = '';
  confirmNewPassword = '';

  editForm = new FormGroup({
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    currpassword: new FormControl('', [Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  private id: number;
  oldPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private sharedService: SharedService
  ) {
    this.id = 0;
  }


  toChange() {
    if (this.editForm.valid) {
      this.id = this.authService.getId();

      this.profileService.updatePassword(this.id, this.currPassword, this.newPassword).subscribe({
        next: () => {
          this.router.navigate(['/edit-profile']);
        },
        error: (error:HttpErrorResponse) => {
          if(error.status===400){            
            this.wrongPassword();
         } else {
          console.log(error);
         }
        }
      })
    }
  }

  refreshInputs() {
    this.currPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  wrongPassword() {
    this.sharedService.openSnack('Incorrect password');
    this.refreshInputs();
  }

}
