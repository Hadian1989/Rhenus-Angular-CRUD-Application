import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { person } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  baseUrl = '/api/users';
  constructor(private http: HttpClient) {}

  getPeople() {
    return this.http.get<person[]>(this.baseUrl);
  }
  getPerson(userId: number) {
    return this.http.get<person>(this.baseUrl);
  }

  addUser(user: person) {
    return this.http.post(this.baseUrl, user);
  }
  updateUser(userId: number) {
    return this.http.patch(this.baseUrl, userId);
  }
}
