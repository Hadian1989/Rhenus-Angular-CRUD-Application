/**
 * The PersonApiServices service provides methods to interact with the person API.
 */
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
  /**
   * Retrieves a list of people.
   * @returns An observable that emits an array of IPerson objects.
   */
  getPeople$(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.baseUrl);
  }
  /**
   * Retrieves the detail of a specific person.
   * @param personId The ID of the person.
   * @returns An observable that emits the IPerson object for the specified ID.
   */
  getPersonDetail$(personId: number): Observable<IPerson> {
    return this.http.get<IPerson>(this.baseUrl.concat(`/${personId}`));
  }
  /**
   * Adds a new person.
   * @param body The data of the new person.
   * @returns An observable that completes when the person is added successfully.
   */
  addPerson$(body: INewPerson): Observable<any> {
    return this.http.post(this.baseUrl, body);
  }
  /**
   * Updates the details of a person.
   * @param body The updated data of the person.
   * @returns An observable that completes when the person is updated successfully.
   */
  updatePerson$(body: {}): Observable<any> {
    let personId: number = body['id'];
    return this.http.patch(this.baseUrl.concat(`/${personId}`), body);
  }
  /**
   * Deletes a person.
   * @param personId The ID of the person to be deleted.
   * @returns An observable that completes when the person is deleted successfully.
   */

  deletePerson$(personId: number): Observable<any> {
    return this.http.delete(this.baseUrl.concat(`/${personId}`));
  }
}
