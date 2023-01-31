import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../../../services/registration/registration.service';

@Component({
  selector: 'app-account-activated',
  templateUrl: './account-activated.component.html',
  styleUrls: ['./account-activated.component.scss']
})
export class AccountActivatedComponent implements OnInit {
  hasError : boolean;
  token: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private registrationService: RegistrationService) { 
    this.token = 0;
    this.hasError = false;
  }

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];
      }
    );

    this.registrationService.activatePassenger(this.token).subscribe({
      next: (result) => {
        this.hasError = false;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }
      },
    });
  }


  toLogin() {
    this.router.navigate(['/login']);
  }
}
