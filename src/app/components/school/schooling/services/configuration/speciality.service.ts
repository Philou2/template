import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Speciality} from '../../interface/configuration/Speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Speciality): Observable<any>{
    return this.http.post<Speciality>(`${this.baseUrl}/speciality/create`, data);
  }

  getCollection(): Observable<Speciality[]>{
    return this.http.get<Speciality[]>(`${this.baseUrl}/speciality/get`);
  }

  put(id: number, data: Speciality): Observable<any>{
    return this.http.put<Speciality>(`${this.baseUrl}/speciality/edit/${id}`, data);
  }

  delete(id: number): Observable<Speciality>{
    return this.http.delete<Speciality>(`${this.baseUrl}/speciality/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Speciality[]>{
    const options = {body: ids};
    return this.http.delete<Speciality[]>(`${this.baseUrl}/specialityes/delete`, options);
  }
}
