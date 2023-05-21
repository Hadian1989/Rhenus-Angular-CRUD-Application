import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { PersonApiServices } from './person-api-services';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

fdescribe('PersonApiService', () => {
  let personApiServices: PersonApiServices;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonApiServices],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(PersonApiServices);
  });

  it('should the list of people', () => {
    // Spy on and mock the HttpClient.
    httpClient = TestBed.get(HttpClient);
    const peopleMock = [
      {
        id: 1,
        first_name: 'Jack',
        last_name: 'Schulz',
        email: 'jack.schultz@gmail.com',
      },
      {
        first_name: 'jack2',
        last_name: 'schultz2',
        email: 'jack2.schultz2@gmail.com',
        id: 2,
      },
      {
        first_name: 'Math',
        last_name: 'Henkler',
        email: 'math.henkler@gmail.com',
        id: 3,
      },
      {
        first_name: 'jafar',
        last_name: 'jafarlast',
        email: 'jafa@gmail.com',
        id: 4,
      },
      {
        first_name: 'Jack34',
        last_name: 'Smith',
        email: 'jack.smith@gmail.com',
        id: 5,
      },
      {
        first_name: 'Ghazaleh',
        last_name: 'Hadian',
        email: 'ghazal@gmail.com',
        id: 6,
      },
    ];
    spyOn(httpClient, 'get').and.returnValue(of(peopleMock));
    // Use our service to get homes.
    personApiServices = TestBed.get(PersonApiServices);
    const spy = jasmine.createSpy('spy');
    personApiServices.getPeople$().subscribe(spy);
    // Verify that the service returned mocked data.
    expect(spy).toHaveBeenCalledWith(peopleMock);
    // Verify that the service called the proper HTTP endpoint.
    expect(httpClient.get).toHaveBeenCalledWith('/api/people')
  });
});
