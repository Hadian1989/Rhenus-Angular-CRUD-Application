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
  getPersonDetail$(personId: number): Observable<IPerson> {
    return this.http.get<IPerson>(this.baseUrl.concat(`/${personId}`));
  }

  addPerson$(body: INewPerson) {
    return this.http.post(this.baseUrl, body);
  }
  updatePerson$(body:{}) {
    let personId: number = body['id'];
    return this.http.patch(this.baseUrl.concat(`/${personId}`), body);
  }
  deletePerson$(personId: number) {
    return this.http.delete(this.baseUrl.concat(`/${personId}`));
  }
}
