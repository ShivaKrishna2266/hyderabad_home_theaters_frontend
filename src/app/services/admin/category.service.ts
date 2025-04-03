import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;

  constructor(
    private userStorageService: UserStorageService,
    private http: HttpClient,
  ) { }

  getAllCategories(): Observable<any> {
    const token = localStorage.getItem('token'); const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(this.apiUrl + "/admin/getAllCategories", { headers });
  }

  addCategory(category: CategoryDTO, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('categoryImageFile', imageFile);
    formData.append('categoryDTO', JSON.stringify(category));

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<any>(this.apiUrl + "/admin/createCategory", formData, { headers })
  }

  updateCategory(category: CategoryDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.apiUrl + "/admin/updateCategoryById/" + category.categoryId, category, { headers });
  }


}