import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

 private apiUrl = environment.apiUrl;
  
    constructor(
                private userStorageService:UserStorageService,
                private http: HttpClient,
    ) { }


       getAllReviews(): Observable<any>{
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.apiUrl + "/admin/getAllReviews" , {headers})
       }
}
