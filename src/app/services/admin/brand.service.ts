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

  addBrand(brand: BrandDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(this.apiUrl + "/admin/createBrand", brand, { headers }); // ✅ Sending the request body correctly
  }
  
}
