import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private api = 'http://localhost:5000/api/applications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Application[]> { return this.http.get<Application[]>(this.api); }
  submit(data: any) { return this.http.post(this.api, { ...data, status: 'pending' }); }
  update(id: string, data: any) { return this.http.put(`${this.api}/${id}`, data); }
  delete(id: string) { return this.http.delete(`${this.api}/${id}`); }
}