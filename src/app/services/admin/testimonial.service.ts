import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestimonialDTO } from 'src/app/DTO/testimonialDTO';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  private apiUrl = environment.apiUrl;

  constructor(
    private userStorageService: UserStorageService,
    private http: HttpClient,
  ) { }

  getAllTestimonial(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + "/admin/getAllTestimonials", { headers });
  }

  addTestimonial(testimonial: TestimonialDTO, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('testimonialImageFile', imageFile);
    formData.append('testimonialDTO', JSON.stringify(testimonial));

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<any>(this.apiUrl + "/admin/addTestimonials", formData, { headers })
  }

  updateTestimonial(testimonial: TestimonialDTO,  imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('testimonialImageFile', imageFile);
    formData.append('testimonialDTO', JSON.stringify(testimonial));

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.put<any>(this.apiUrl + "/admin/updateTestimonial/" + testimonial.testimonialId, formData, { headers });
  }

}
