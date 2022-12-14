import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    constructor(private router: Router) {}
    showLogin=true;
    showSignup=true;
    ngOnInit(): void {
        
    }
    driver=true;
    unregisteredUser=false;
    toLogin() {
        this.showSignup=true;
        this.showLogin=true;
        this.router.navigate(['/login']);
        
    }
    toSignup() {
        this.showSignup=true;
        this.showLogin=true;
        this.router.navigate(['/signup']);
    
    }
}