import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

 private apiUrl = environment.apiUrl;
  
    constructor(
                private userStorageService:UserStorageService,
                private http: HttpClient,
    ) { }


       getAllQuestions(): Observable<any>{
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.apiUrl + "/admin/getAllQuestions" , {headers})
       }
}
