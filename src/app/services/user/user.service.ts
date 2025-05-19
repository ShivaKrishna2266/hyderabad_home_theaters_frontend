import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getUserDetails(userId: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get(`${this.apiUrl}/user/getUserById/${userId}`, {headers});
  // }

  getUserDetails(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user/getUserByFirstName/${username}`, {headers});
  }
}