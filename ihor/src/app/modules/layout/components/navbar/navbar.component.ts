import {Component, OnInit} from "@angular/core";
import {AuthService} from "src/app/modules/auth/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role!: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.userState$.subscribe((result) => {
      this.role = result;
    });
    this.authService.setUser();
  }
}
