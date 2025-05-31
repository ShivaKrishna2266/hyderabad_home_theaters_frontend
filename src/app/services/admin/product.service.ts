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
    private userStorageService: UserStorageService,
    private http: HttpClient,
  ) { }


  getAllProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllProducts", { headers })
  }

  //  addProduct(product: ProductDTO,  imageFile: File): Observable<ProductDTO> {
  //   const formData: FormData = new FormData();
  //   formData.append('productImageFile', imageFile); // ✅ Must match backend param name
  //   formData.append('productDTO', JSON.stringify(product)); // ✅ Must match backend param name

  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.post<ProductDTO>(`${this.apiUrl}/admin/createProduct`, formData, { headers });
  // }

 addProduct(formData: FormData): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.post<ProductDTO>(`${this.apiUrl}/admin/createProduct`, formData, { headers });
}


  updateProduct(product: ProductDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.apiUrl + "/admin/updateProduct/" + product.productId, product, { headers });
  }

  deleteProduct(product: ProductDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/admin/deleteProductById/${product.productId}`, { headers });
  }

    getAllCustomers(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllCustomers", { headers })
  }
}
