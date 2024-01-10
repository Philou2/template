import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TimeTableModelDayCell} from "../interface/time-table-model-day-cell";
import {StudRegistration} from "../../schooling/interface/registration/studRegistration";
import {TimeTableModel} from "../interface/time-table-model";

@Injectable({
  providedIn: 'root'
})
export class TimeTableModelDayCellService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: TimeTableModelDayCell): Observable<any>{
    return this.http.post(`${this.baseUrl}/timetable-model-day-cell/create`, data);
  }

  // getModel(id: number):  Observable<any> {
  //   return this.http.get<TimeTableModel[]>(`${this.baseUrl}/timetable-model-day-cell/get/${id}`);
  // }

  // editModel(id: number, data: any): Observable<any>{
  //   return this.http.post(`${this.baseUrl}/timetable-model-day-cell/create/${id}`, data);
  // }
  getCollection(): Observable<TimeTableModelDayCell[]> {
    return this.http.get<TimeTableModelDayCell[]>(`${this.baseUrl}/timetable-model-day-cell/get`);
  }
  putGeneral(id: number, data: TimeTableModelDayCell): Observable<any>{
    return this.http.put(`${this.baseUrl}/timetable-model-day-cell/edit/${id}`, data);
  }
  put(id: number, id2: number): Observable<any>{
    const reqData: any = {
      daycell1: id,
      daycell2: id2
    };
    return this.http.post(`${this.baseUrl}/timetable-model-swap/permute`, reqData);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-day-cell/delete/${id}`);
  }

  getCalendar(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/calender/get/${id}`);
  }
  putValidate(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-course-validate/edit/${id}`);
  }
  putInValidate(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/teacher-course-end-time/edit/${id}`);
    }
    putStartCourse(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-course-start-time/edit/${id}`);
  }

  putEndCourse(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-course-end-time/edit/${id}`);
  }
  deleteMultiple(ids: number[]): Observable<TimeTableModelDayCell[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/timetable-model-day-cell/states`, options);

  }
}

