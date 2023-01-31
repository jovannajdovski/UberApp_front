import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { WorkTimeService } from 'src/app/modules/driver/services/work-time/work-time.service';

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent {
  public selectedPage:any;
  public enumSP=SelectedPage;
  constructor(private router:Router, private authService:AuthService, private workTimeService:WorkTimeService) {
    this.toHome();
    this.authService.setUser();
  }  
  toHome(){
    this.selectedPage=SelectedPage.HOME;
    this.router.navigate(['/driver']);
  }
  toInbox(){
    this.selectedPage=SelectedPage.INBOX;
    this.router.navigate(['/inbox']);   
  }
  toHistory(){
    this.selectedPage=SelectedPage.HISTORY;
    this.router.navigate(['/driver/history']); 
  }
  toProfile(){
    this.selectedPage=SelectedPage.PROFILE;
    this.router.navigate(['/driver/profile']);   
  }

  toAcceptedRides(){
    this.selectedPage=SelectedPage.ACCEPTEDRIDES;
    this.router.navigate(['/accepted-rides']);   
  }
  logout(){
    this.workTimeService.endShift();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  toCurrentRide(){
    this.selectedPage=SelectedPage.CURRENT_RIDE;
    this.router.navigate(['/current-ride'])
  }
}
enum SelectedPage {
  CURRENT_RIDE, HOME, INBOX, HISTORY, PROFILE, ACCEPTEDRIDES
}
