import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewPerson, IPerson } from '../models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonApiServices {
  baseUrl = '/api/people';
  constructor(private http: HttpClient) {}

  getPeople$(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.baseUrl);
  }
  getPersonDetail$(userId: number): Observable<IPerson> {
    return this.http.get<IPerson>(this.baseUrl.concat(`/${userId}`));
  }

  addPerson$(body: INewPerson) {
    return this.http.post(this.baseUrl, body);
  }
  updatePerson$(body: IPerson) {
    let userId: number = body['id'];
    return this.http.patch(this.baseUrl.concat(`/${userId}`), body);
  }
  deletePerson$(userId: number) {
    return this.http.delete(this.baseUrl.concat(`/${userId}`));
  }
}
