import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/productDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
   private apiUrl = environment.apiUrl;
 
   constructor(
               private userStorageService:UserStorageService,
               private http: HttpClient,
   ) { }


   getAllProducts(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllProducts" , {headers})
   }

   addProduct(formData: ProductDTO): Observable<ProductDTO> {
    const token = localStorage.getItem('token') ?? ''; // Ensure token is not null
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post<ProductDTO>(`${this.apiUrl}/admin/createProduct`, formData, { headers });
  }
  
}
