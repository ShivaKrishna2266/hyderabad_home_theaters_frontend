import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserStorageService } from "../storege/user-storege.service";
import { environment } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient
    
  ) {} // Removed unnecessary instance of UserStorageService

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
}
