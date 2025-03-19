import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  private apiUrl = environment.apiUrl;
  constructor(
              private http:HttpClient,
  ) { }

  getAllBrands(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllBrands");
  }

  getBrandById(brandId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/data/getBrandById/${brandId}`);
  }

  getAllProducts(): Observable<any>{
    return this.http.get<any>(this.apiUrl + "/data/getAllProducts");
  }
  getProductsByBrand(brandId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getProductsByBrand/${brandId}`);
  }
  
  getAllCategories(): Observable<any>{
     return this.http.get<any>(this.apiUrl + "/data/getAllCategories");
  }

  getSubCategoryByCategory(categoryId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/data/getSubCategoryByCategory/${categoryId}`)
  } 

  getAllGeneralSettings() : Observable<any>{
    return this.http.get<any>(this.apiUrl + "/data/getAllGeneralSettings");
  }

  getAllCountryCodes(): Observable<any>{
    return this.http.get<any>(this.apiUrl + "/data/getAllCountryCodes");
  }

  addCountactUs(data : any){
    return this.http.post<any>(`${this.apiUrl}/data/addContactUs` , data);
  }
}
