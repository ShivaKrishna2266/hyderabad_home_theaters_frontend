import { Injectable } from '@angular/core';

const TOKEN = 'token';
const ROLE_ADMIN = 'admin'
const ROLE_USER = 'user';
const ROLE = 'role';
const USER = 'user'; // Correct key for storing user data

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  

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
