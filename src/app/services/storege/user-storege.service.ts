import { Injectable } from '@angular/core';
import { UserProfileDTO } from 'src/app/DTO/userProfileDTO';

const TOKEN = 'token';
const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';
const ROLE = 'role';
const USER = 'user'; 
const PROFILE = 'user_profile';
const ORDER_ID = 'ecom-order-id';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private static userKey = 'pendingRegistration';

  constructor() {}


  static setPendingUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  static getPendingUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  static clearPendingUser(): void {
    localStorage.removeItem(this.userKey);
  }

  // ----- Token Handling -----
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  // ----- User Handling -----
  public saveUser(user: any): void {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  // static getUserId(): string {
  //   return this.getUser()?.userId || '';
  // }

    static getUserId(): string {
    const user = this.getUser();
    if(user==null){
      return '';
    }
    return user.userId;
  }

  getProfile(): any {
  return JSON.parse(localStorage.getItem('profile') || '{}');
}

getUserId(): string {
  return localStorage.getItem('userId') || '';
}

getEmail(): string {
  return localStorage.getItem('email') || '';
}

  static getEmail(): string {
    return this.getUser()?.username || '';
  }

  static getUserRole(): string {
    return this.getUser()?.role || '';
  }

  getUserRole(): string {
    return UserStorageService.getUser()?.role || '';
  }

   getCurrentUser(): { email: string } | null {
    // mock user, replace with real auth logic
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // ----- Profile Handling -----
  public saveProfile(profile: any):void{
    window.localStorage.removeItem(PROFILE);
    window.localStorage.setItem(PROFILE, JSON.stringify(profile));
  }
  static getProfile(): UserProfileDTO | null {
  const profile = localStorage.getItem(PROFILE);
  return profile ? JSON.parse(profile) as UserProfileDTO : null;
}

  // ----- Order ID Handling -----
  static setOrderId(razorpayOrderId: string): void {
    localStorage.setItem(ORDER_ID, razorpayOrderId);
  }

  static getOrderId(): string | null {
    return localStorage.getItem(ORDER_ID);
  }

  // ----- Role Checks -----
  isAdminLoggedIn(): boolean {
    const user = UserStorageService.getUser();
    return user?.role === ROLE_ADMIN;
  }

  isCustomerLoggedIn(): boolean {
    const user = UserStorageService.getUser();
    return user?.role === ROLE_USER;
  }

  static isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user?.role === ROLE_ADMIN;
  }

  static isUserLOggedIn(): boolean{
    const user = this.getUser();
    return user?.role ===ROLE_USER;
  }
  // ----- Sign Out -----
  singOut(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(PROFILE);
    localStorage.removeItem(ORDER_ID);
  }
}
