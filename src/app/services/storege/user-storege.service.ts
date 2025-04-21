import { Injectable } from '@angular/core';
import { UserProfileDTO } from 'src/app/DTO/userProfileDTO';

const TOKEN = 'token';
const ROLE_ADMIN = 'admin'
const ROLE_USER = 'user';
const ROLE = 'role';
const USER = 'user'; 
const PROFILE ='ecom-profile';
const ORDER_ID ='ecom-order-id';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  static setOrderId(razorpayOrderId: any) {
    window.localStorage.setItem(ORDER_ID, razorpayOrderId);
  }

  static getOrderId() {
    return localStorage.getItem(ORDER_ID);
  }

  profile :UserProfileDTO[] = [];
  

    constructor() {}

    public saveToken(token: string) : void{
      window.localStorage.setItem(TOKEN, token);
    } 

    public saveUser(user:any): void{
        window.localStorage.setItem(USER, JSON.stringify(user));
    }

    static getToken(): string | null{
      return localStorage.getItem(TOKEN);
    }
    
    getToken(): string | null{
      return localStorage.getItem(TOKEN);
    }

    public saveProfile(profile: any):void{
      window.localStorage.removeItem(PROFILE);
      window.localStorage.setItem(PROFILE, JSON.stringify(profile));
    }
  
    static getProfile(): any {
      const profile = localStorage.getItem(PROFILE);
      console.log('Retrieved profile:', profile); // Add this log to see the value
      return profile ? JSON.parse(profile) : null;
    }




    
    static getUser(): any{
     const user = localStorage.getItem(USER);
      return user? JSON.parse(user) : null;
    }
    static getUserId(): string{
      return UserStorageService.getUser()?.userId || '';
    }

    static getEmail(): string {
      return UserStorageService.getUser()?.username || '';
    }

  
    static getUserRole(): string {
      const user = this.getUser();
      if(user==null){
        return '';
      }
      return user.role;
    }
     getUserRole(): string{
      return UserStorageService.getUser()?.role || '';
    }
    isAdminLoggedIn(): boolean{
      const user = UserStorageService.getUser();
      return user?.role === ROLE_ADMIN;
    }

    isCustomerLoggedIn(): boolean{
      const user = UserStorageService.getUser();
      return user?.role === ROLE_USER;
    }

    static isAdminLoggedIn(): boolean {
      const user = UserStorageService.getUser();
      return user?.role === ROLE_ADMIN;
    }
    singOut(): void{
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
}
