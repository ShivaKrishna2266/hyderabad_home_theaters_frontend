import { Injectable } from '@angular/core';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { BrandDTO } from 'src/app/DTO/brandDTO';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = environment.apiUrl;

  constructor(
              private userStorageService:UserStorageService,
              private http: HttpClient,
  ) { }

  getAllBrands(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllBrands",{headers});
  }

  addBrand(brand: BrandDTO, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('brandImageFile', imageFile); // ✅ Must match backend param name
    formData.append('brandDTO', JSON.stringify(brand)); // ✅ Must match backend param name

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl + "/admin/createBrand", formData, { headers });
}

  updateBrand(brand:BrandDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.apiUrl +"/admin/updateBrand/" +brand.brandId, brand, {headers});
    }

  
}
