import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'https://ionic-server-dma2.onrender.com/api/applications';

  constructor(private http: HttpClient) {}

  submit(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
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
