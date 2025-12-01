import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private apiUrl = 'http://localhost:5000/api/applications';

  constructor(private http: HttpClient) {}

  submit(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data); // FormData → no Content-Type header needed
  }

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}