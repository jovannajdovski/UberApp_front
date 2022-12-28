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
  }
  toProfile(){
    this.selectedPage=SelectedPage.PROFILE;
  }
  logout(){
    
  }
}
enum SelectedPage {
  HOME, INBOX, HISTORY, PROFILE
}
