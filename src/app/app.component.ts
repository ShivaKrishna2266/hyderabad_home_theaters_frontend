import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { UserStorageService } from './services/storege/user-storege.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), 
      transition(':enter', [animate('500ms ease-in')]), 
      transition(':leave', [animate('500ms ease-out')])
    ])
  ]
})
export class AppComponent implements OnInit {
  cardVisible = false;
  closeTimeout: any;
  private navigationSubscription!: Subscription;

  @ViewChild('myModal') myModal?: ElementRef;

  constructor(
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ensure navigation-based redirection
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.redirectUser());
  }

  ngAfterViewInit(): void {
    if (this.myModal) {
      // Ensure modal-related operations are handled properly
    }
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return !!this.userStorageService.getToken();
  }

  getRole(): string | null {
    return UserStorageService.getUserRole();
  }

  // getRole(): string | null {
  //   const user = this.userStorageService.getUserRole();
  //   return user?.role || null; // ROLE_ADMIN or ROLE_USER
  // }
  getCurrentRoute(): string {
    return this.router.url;
  }

  showCard() {
    this.cardVisible = true;
    this.resetCloseTimer();
  }

  hideCard() {
    this.resetCloseTimer(); // Clear any existing timeout
    this.closeTimeout = setTimeout(() => {
      this.cardVisible = false;
    }, 3000);
  }

  resetCloseTimer() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  logOut() {
    this.userStorageService.singOut();
    this.router.navigateByUrl('/login');
  }

  redirectUser() {
    if (this.isLoggedIn()) {
      const role = this.getRole();
      if (role === 'ADMIN' && this.router.url !== '/admin-dashboard') {
        this.router.navigateByUrl('/admin-dashboard');
      } else if (role === 'USER' && this.router.url !== '/user-dashboard') {
        this.router.navigateByUrl('/home');
      }
    }
  }

  
}
