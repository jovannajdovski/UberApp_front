import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profile: Profile = {
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    email: '',
    address: '',
  };

  private id: number;

  constructor(
    private authService : AuthService,
    private router : Router,
    private profileService: ProfileService
  ) {
    this.id = 0; 
  }

  profileForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.email,Validators.required]),
    address: new FormControl('',[Validators.required]),
  });

  ngOnInit(): void {
    this.id = this.authService.getId();

    this.profileService.getProfile(this.id).subscribe({
      next: (profile) => {
        this.profile.name = profile.name;
        this.profile.surname = profile.surname;
        this.profile.profilePicture = profile.profilePicture;
        this.profile.telephoneNumber = profile.telephoneNumber;
        this.profile.email = profile.email;
        this.profile.address = profile.address;
      },
      error: (error) => { 
        console.log(error);
      },
    });
  }

  edit(){
    if(this.profileForm.valid){
      this.profileService.update(this.id, this.profile).subscribe({
        next: () => {
          //this.ngOnInit();
          this.router.navigate([this.getProfileRoute()]);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  getProfileRoute(){
    if(this.authService.getRole()==="PASSENGER"){
      return "/passenger-profile";
    }
    if(this.authService.getRole()==="DRIVER"){
      return "/driver-profile";
    }
    return "/admin-profile";
  }

  editPassword(){
    this.router.navigate(['/edit-password']);
  }
}
