import { Component, OnInit } from '@angular/core';
import { Profile, ProfileWPassword } from '../../model/profile';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  profile: ProfileWPassword = {
    password: '',
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    email: '',
    address: '',
  };

  constructor(
    private authService : AuthService,
    private router : Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getId();

    this.profileService.getProfile(id).subscribe({
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
    this.router.navigate(['/edit-profile']);
  }
}
