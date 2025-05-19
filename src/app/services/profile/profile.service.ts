import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL ="http://localhost:7070/data"
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(private http:HttpClient) { }

  saveProfile(profileForm: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(URL + 'createProfile', profileForm, { headers: headers });
      
  }
}