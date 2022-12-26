import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent {

  hideCurrPassword=true;
  hidePassword=true;
  hideConfirmPassword=true;

  editForm = new FormGroup({
    password: new FormControl('',[Validators.minLength(6), Validators.required]),
    currpassword: new FormControl('',[Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('',[Validators.minLength(6), Validators.required]),
  });


  constructor(private router: Router) {}

  toChange() {
    if (this.editForm.valid) {
          //
    }
  }

}
