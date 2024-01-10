import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../interface/configuration/Department';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Department): Observable<any>{
    return this.http.post(`${this.baseUrl}/department/create`, data);
  }

  getCollection(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/department/get`);
  }

  put(id: number, data: Department): Observable<any>{
    return this.http.put(`${this.baseUrl}/department/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/department/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Department[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/department/states`, options);

  }
}
