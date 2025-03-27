import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 private apiUrl = environment.apiUrl;
 
   constructor(
               private userStorageService:UserStorageService,
               private http: HttpClient,
   ) { }

   getAllCategories(): Observable<any>{
      const token = localStorage.getItem('token');const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.get<any>(this.apiUrl + "/admin/getAllCategories",{headers});
   }

   addCategory(formData: CategoryDTO): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json'
    });
    return this.http.post<any>(this.apiUrl + "/admin/createCategory", formData,{headers})
   }
   
  }