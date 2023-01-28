import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-navbar',
  templateUrl: './administrator-navbar.component.html',
  styleUrls: ['./administrator-navbar.component.css']
})
export class AdministratorNavbarComponent {
  public selectedPage:any;
  public enumSP=SelectedPage;
  constructor(private router:Router) {
    this.toHome();
  }  
  toHome(){
    this.selectedPage=SelectedPage.HOME;
    this.router.navigate(['/administrator']);
  }
  toInbox(){
    this.selectedPage=SelectedPage.INBOX;
    this.router.navigate(['/inbox']);   
  }
  toHistory(){
    this.selectedPage=SelectedPage.HISTORY;
    this.router.navigate(['/admin/history']);   
  }
  toUsers(){
    this.selectedPage=SelectedPage.USERS;
    this.router.navigate(['/administrator/drivers']);   
  }
  toProfile(){
    this.selectedPage=SelectedPage.PROFILE;
    this.router.navigate(['/administrator/profile']);   
  }
  logout(){
    
  }
}
enum SelectedPage {
  HOME, INBOX, HISTORY, USERS, PROFILE
}
