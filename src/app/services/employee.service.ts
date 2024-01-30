import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'https://crud-data-umgi.onrender.com/';

  constructor(private _http: HttpClient) {}

  addEmployee(data: Employee): Observable<any> {
    return this._http.post(`${this.baseUrl}employees`, data);
  }

  getEmployees(): Observable<any> {
    return this._http.get(`${this.baseUrl}employees`);
  }

  editEmp(id: number | string, data: Employee): Observable<any> {
    return this._http.put(`${this.baseUrl}employees/${id}`, data);
  }

  deleteEmp(id: number | string): Observable<any> {
    return this._http.delete(`${this.baseUrl}employees/${id}`);
  }

  getEmployee(id: number | string): Observable<any> {
    return this._http.get(`${this.baseUrl}employees/${id}`);
  }
}
