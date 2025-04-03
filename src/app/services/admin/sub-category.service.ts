import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private apiUrl = environment.apiUrl;

  constructor(
    private userStorageService: UserStorageService,
    private http: HttpClient,
  ) { }

  getAllSubCategories(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllSubCategories", { headers });
  }

  addSubCategory(subCategory: SubCategoryDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl + "/admin/createSubCategory",subCategory, { headers });
  }

  updateSubCategory(subCategory:SubCategoryDTO): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.apiUrl + "/admin/updateSubCategory/" + subCategory.subCategoryId,subCategory, {headers} )
  }
}