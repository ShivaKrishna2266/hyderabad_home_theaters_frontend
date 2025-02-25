import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserStorageService } from "./user-storege.service";

interface LoginResponse {
  token: string;
  role: string;
  user: string;  // Adjust this type based on your API response
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = "http://localhost:7070";  
  private readonly LOGIN_ENDPOINT = "/authenticate";  

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}${this.LOGIN_ENDPOINT}`, { username, password }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  logout(): void {
    this.userStorageService.clearStorage();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.userStorageService.getToken();
  }
}
