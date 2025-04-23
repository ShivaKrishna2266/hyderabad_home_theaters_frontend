import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserStorageService } from "../storege/user-storege.service";
import { environment } from "src/environments/environments";
import UserDTO, { AppUserRole } from "./user.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private userStorageService : UserStorageService,
    
  ) {} 
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData); // No Authorization header needed
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`,{ username, password },{ observe: 'response' }
    );
  }

  getProtectedRoute(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${UserStorageService.getToken()}`, // Using static method properly
    });

    return this.http.get(`${this.apiUrl}/protected-route`, { headers });
  }

  verifyOtp(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, userData);
  }
}

