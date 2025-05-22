import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeaderDTO } from 'src/app/DTO/headerDTO';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

 
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  // ✅ GET all headers (with authorization)
  getAllHeaders(): Observable<any> {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllHeaders",{headers});
  }

  // ✅ POST new header
  createHeader(data: HeaderDTO): Observable<any> {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/admin/createHeader`, data, { headers });
  }

  // ✅ PUT update existing header
  updateHeader(headerId: number, selectedHeader: HeaderDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/admin/updateHeader/${headerId}`, selectedHeader, { headers });
  }
}