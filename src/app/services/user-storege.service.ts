import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  getSocialUser() {
    throw new Error('Method not implemented.');
  }

  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly USERNAME_KEY = 'user_name';
  private readonly ADMIN_KEY = 'admin_name';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  setRole(role: string): void {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getUser(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  setUser(user: string): void {
    localStorage.setItem(this.USERNAME_KEY, user);
  }

  getAdmin(): string | null {
    return localStorage.getItem(this.ADMIN_KEY);
  }

  setAdmin(adminName: string): void {
    localStorage.setItem(this.ADMIN_KEY, adminName);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.ADMIN_KEY);
  }
}
