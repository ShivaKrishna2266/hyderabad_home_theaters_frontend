import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(
              private http : HttpClient,
              private userStorageService : UserStorageService,
  ) { }

  getAllProducts(brand: string): Observable<any>{
      const headers = new HttpHeaders({
        'Authorization':`Bearer${this.userStorageService.getToken()}`
      });
      return this.http.get<any>(this.apiUrl + '/getAllProducts', { headers });
    }
}
