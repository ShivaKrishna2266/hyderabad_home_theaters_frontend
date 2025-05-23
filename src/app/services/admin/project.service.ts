import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDTO } from 'src/app/DTO/projectDTO';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

 getAllProjects(): Observable<{ data: ProjectDTO[] }> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<{ data: ProjectDTO[] }>(`${this.apiUrl}/admin/getAllProjects`, { headers });
}


createProject(formData: FormData): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    // Don't set 'Content-Type' here — let the browser handle it
  });

  return this.http.post(`${this.apiUrl}/admin/createProject`, formData, { headers });
}




}