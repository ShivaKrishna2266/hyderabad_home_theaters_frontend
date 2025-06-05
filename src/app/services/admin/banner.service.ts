import { Injectable } from '@angular/core';
import { UserStorageService } from '../storege/user-storege.service';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BannerDTO } from 'src/app/DTO/bannerDTO';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private apiUrl = environment.apiUrl;

  constructor(
    private userStorageService: UserStorageService,
    private http: HttpClient,
  ) { }

  getAllBanners(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllBanners", { headers });
  }



  addBanners(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // Let browser set 'Content-Type' for FormData
    });

    return this.http.post(`${this.apiUrl}/admin/addBanner`, data, { headers });
  }

  updateBanner(banner: BannerDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.apiUrl + "/admin/updateBanner/" + banner.bannerId, banner, { headers });
  }
}
