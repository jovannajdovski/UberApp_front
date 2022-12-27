import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  profile: Profile = {
    _id: 0,
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    emaill: '',
    address: '',
  };

  constructor(
  ) {}

  ngOnInit(): void {}
}
