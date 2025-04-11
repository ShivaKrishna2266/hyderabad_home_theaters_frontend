import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { ReviewDTO } from 'src/app/DTO/reviewDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  private cartItems: any[] = [];

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

  getAllTestimonial(): Observable<any>{
    return this.http.get<any>(this.apiUrl + "/data/getAllTestimonials");
  }

  getAllReviews(): Observable<any>{
    return this.http.get<any>(this.apiUrl + "/data/getAllReviews");
  }

  getProductReviews(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getProductReviews/${productId}/reviews`);
  }

  createReview(reviewData: ReviewDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(`${this.apiUrl}/data/createReview`, reviewData);
  }
  


  //=====================CART=======================================//

  addToCart(product: any) {
    this.cartItems.push(product);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
