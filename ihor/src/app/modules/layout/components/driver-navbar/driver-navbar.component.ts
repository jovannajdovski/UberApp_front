import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent {
  public selectedPage:any;
  public enumSP=SelectedPage;
  constructor(private router:Router) {
    this.toHome();
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
  logout(){
    
  }
  toCurrentRide(){
    this.selectedPage=SelectedPage.CURRENT_RIDE;
    this.router.navigate(['/current-ride'])
  }
}
enum SelectedPage {
  CURRENT_RIDE, HOME, INBOX, HISTORY, PROFILE
}
