import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPerson } from '../models/person';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  createPerson(project_data: IPerson) {
    return this.http.post<IPerson>(
      `${environment.apiUrl}/api/project/`,
      project_data,
      httpOptions
    );
  }

  gerPersonDetail(): Observable<IPerson> {
    return this.http.get<IPerson>(`${environment.apiUrl}/api/user/`);
  }
  updatePersonDetail(data: IPerson) {
    return this.http.patch<IPerson>(`${environment.apiUrl}/api/project/`, data);
  }

  getPeople(): Observable<IPerson[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/project/`);
  }
}
