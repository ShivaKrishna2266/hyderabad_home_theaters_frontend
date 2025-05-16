import { Injectable } from '@angular/core';
import { UserProfileDTO } from 'src/app/DTO/userProfileDTO';

const TOKEN = 'token';
const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';
const USER = 'user';
const PROFILE = 'profile';
const ORDER_ID = 'ecom-order-id';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private static userKey = 'pendingRegistration';

  constructor() { }


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
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  // ----- User Handling -----

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }


  static getUserId(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.userId;
  }

  static getEmail(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.email;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.role;
  }

  // ----- Profile Handling -----
  public saveProfile(profile: any): void {
    try {
      const cleanProfile = typeof profile === 'string' ? JSON.parse(profile) : profile;
      localStorage.setItem(PROFILE, JSON.stringify(cleanProfile));
    } catch (e) {
      console.error('Failed to stringify profile:', e);
    }
  }

  static getProfile(): UserProfileDTO | null {
    try {
      const profileStr = localStorage.getItem(PROFILE);
      return profileStr ? JSON.parse(profileStr) : null;
    } catch (e) {
      console.error('Failed to parse profile JSON:', e);
      return null;
    }
  }

  // public saveProfile(profile: any):void{
  //     window.localStorage.removeItem(PROFILE);
  //     window.localStorage.setItem(PROFILE, JSON.stringify(profile));
  //   }

  //   static getProfile():any{
  //      const profileStr = localStorage.getItem(PROFILE);
  //     return profileStr ? JSON.parse(profileStr) : null;
  //   }

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
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ROLE_ADMIN';
  }

  static isUserLOggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === ROLE_USER;
  }
  // ----- Sign Out -----
  singOut(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(PROFILE);
    localStorage.removeItem(ORDER_ID);
  }
}
