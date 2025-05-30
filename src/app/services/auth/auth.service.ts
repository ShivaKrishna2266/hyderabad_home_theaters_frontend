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
  constructor(private http: HttpClient) { }

  // Register User (Step 1)
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  // Send OTP manually (Optional if used separately)
  sendOtp(phoneNumber: string): Observable<any> {
    const params = { phoneNumber };
    return this.http.post(`${this.apiUrl}/send-otp`, null, { params });
  }

  // Verify OTP and Register (Step 2)
  verifyOtp(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, userData);
  }

  // Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, { username, password }, { observe: 'response' });
  }

  // Optional: Protected route test (requires JWT)
  getProtectedRoute(): Observable<any> {
    const token = UserStorageService.getToken(); // Make sure this returns the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/protected-route`, { headers });
  }


  requestPasswordReset(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }, { observe: 'response' });
  }

   resetPassword(token: string, newPassword: string): Observable<any> {
    const params = { token, newPassword };
    return this.http.post(`${this.apiUrl}/reset-password`, null, { params });
  }

}

