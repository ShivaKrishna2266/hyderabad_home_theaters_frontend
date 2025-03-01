import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { UserStorageService } from './services/storege/user-storege.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Initial state
      transition(':enter', [animate('500ms ease-in')]), // Fade-in effect
      transition(':leave', [animate('500ms ease-out')]) // Fade-out effect
    ])
  ]
})
export class AppComponent {
  title = 'hyderabad_home_theaters_frontEnd';

  
 
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  showContent = true;

  constructor(private router: Router, private userStorageService: UserStorageService) {}

  ngOnInit(): void {
    // this.updateLoginStatus();

    // Update login status when navigation occurs
    // this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(() => {
      // this.updateLoginStatus();
    // });
  }

  // updateLoginStatus(): void {
  //   this.isCustomerLoggedIn = this.userStorageService.isCustomerLoggedIn();
  //   this.isAdminLoggedIn = this.userStorageService.isAdminLoggedIn();

  //   // Navigate based on user role
  //   if (this.isAdminLoggedIn) {
  //     this.router.navigateByUrl('/admin-dashboard');
  //   } else if (this.isCustomerLoggedIn) {
  //     this.router.navigateByUrl('/customer/dashboard');
  //   } else {
  //     this.router.navigateByUrl('/home');
  //   }
  // }

  logOut(): void {
    this.userStorageService.singOut(); // ✅ Fixed typo
    // this.updateLoginStatus();
    this.router.navigateByUrl('/login');
  }
}


