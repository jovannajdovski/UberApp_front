import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
})
export class PassengerProfileComponent implements OnInit {
  id!: number;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.id = this.authService.getId();
  }
}
