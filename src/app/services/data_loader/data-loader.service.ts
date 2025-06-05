import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { QuestionDTO } from 'src/app/DTO/questionDTO';
import { ReviewDTO } from 'src/app/DTO/reviewDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  private cartItems: any[] = [];
  private total: number = 0;

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  getAllBrands(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllBrands");
  }

  getBrandById(brandId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getBrandById/${brandId}`);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllProducts");
  }
  getProductsByBrand(brandId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getProductsByBrand/${brandId}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllCategories");
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getCategoryById/${categoryId}`);
  }
  getSubCategoryByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getSubCategoryByCategory/${categoryId}`)
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getProductById/${productId}`)
  }

  getProductByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getProductByCategory/${categoryId}`)
  }


  getAllGeneralSettings(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllGeneralSettings");
  }

  getAllCountryCodes(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllCountryCodes");
  }

  addCountactUs(data: any) {
    return this.http.post<any>(`${this.apiUrl}/data/addContactUs`, data);
  }

  getAllTestimonial(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllTestimonials");
  }

  getAllReviews(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllReviews");
  }

  getProductReviews(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getProductReviews/${productId}/reviews`);
  }

  createReview(reviewData: ReviewDTO, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('reviewDTO', JSON.stringify(reviewData)); // 👈 Must match backend's @RequestPart("reviewDTO")
    formData.append('reviewImageFile', image); // 👈 Must match backend's @RequestPart("reviewImageFile")

    return this.http.post<any>(`${this.apiUrl}/data/createReview`, formData);
  }

  getAllQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllQuestions");
  }

  createQuestion(questionData: QuestionDTO, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('questionDTO', JSON.stringify(questionData)); // 👈 Must match backend's @RequestPart("reviewDTO")
    formData.append('questionImageFile', image); // 👈 Must match backend's @RequestPart("reviewImageFile")

    return this.http.post<any>(this.apiUrl + "/data/createQuestion", formData);
  }

  getProductQuestion(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getProductQuestion/${productId}/question`);
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

  setCart(items: any[], total: number) {
    this.cartItems = items;
    this.total = total;
  }

  getCart() {
    return { items: this.cartItems, total: this.total };
  }

  // ==================Order=====================//

  submitOrder(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllHeaders(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllHeaders");
  }

  getAllProjects(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllProjects");
  }

  getAllBanners(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/data/getAllBanners");
  }

  getBannerById(bannerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/getBannerById/${bannerId}`);
  }

  getBannerByTitle(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data/getBannersByTitle`, { params: { title } });
  }


}
