import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PersonApiServices } from './person-api-services';
import { INewPerson, IPerson } from '../models/person';

/**
 * This test suite contains unit tests for the PersonApiServices service.
 */

describe('PersonApiService', () => {
  let service: PersonApiServices;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonApiServices],
    });

    service = TestBed.inject(PersonApiServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request with correct data', () => {
    const mockData = {
      first_name: 'John ',
      last_name: ' Doe',
      email: 'johndoe@example.com',
    };

    service.addPerson$(mockData).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual({ message: 'Data successfully posted' });
    });

    const request = httpMock.expectOne('/api/people');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockData);

    request.flush({ message: 'Data successfully posted' });
  });

  it('should handle errors', () => {
    const mockData: INewPerson = {
      first_name: 'John ',
      last_name: ' Doe',
      email: 'johndoe@example.com',
    };

    service.addPerson$(mockData).subscribe(
      (response) => fail('Should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: 'Internal server error' });
      }
    );

    const request = httpMock.expectOne('/api/people');
    request.flush(
      { message: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });

  it('should retrieve a list of persons', () => {
    const mockResponse: IPerson[] = [
      {
        id: 1,
        first_name: 'John ',
        last_name: ' Doe',
        email: 'johndoe@example.com',
      },
      {
        id: 2,
        first_name: 'John2 ',
        last_name: ' Doe2',
        email: 'johndoe2@example.com',
      },
      {
        id: 3,
        first_name: 'John3 ',
        last_name: ' Doe3',
        email: 'johndoe3@example.com',
      },
    ];

    service.getPeople$().subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.length).toBe(3);
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne('/api/people');
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should handle errors', () => {
    service.getPeople$().subscribe(
      (response) => fail('Should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: 'Internal server error' });
      }
    );

    const request = httpMock.expectOne('/api/people');
    request.flush(
      { message: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });

  it('should retrieve a list of persons', () => {
    const mockResponse: IPerson[] = [
      {
        id: 1,
        first_name: 'John ',
        last_name: ' Doe',
        email: 'johndoe@example.com',
      },
      {
        id: 2,
        first_name: 'John2 ',
        last_name: ' Doe2',
        email: 'johndoe2@example.com',
      },
      {
        id: 3,
        first_name: 'John3 ',
        last_name: ' Doe3',
        email: 'johndoe3@example.com',
      },
    ];

    service.getPeople$().subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.length).toBe(3);
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne('/api/people');
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should handle errors', () => {
    service.getPeople$().subscribe(
      (response) => fail('Should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: 'Internal server error' });
      }
    );

    const request = httpMock.expectOne('/api/people');
    request.flush(
      { message: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });

  it('should delete a person', () => {
    const personId = 1;

    service.deletePerson$(personId).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual({ message: 'person successfully deleted' });
    });

    const request = httpMock.expectOne(`/api/people/${personId}`);
    expect(request.request.method).toBe('DELETE');

    request.flush({ message: 'person successfully deleted' });
  });

  it('should handle errors', () => {
    const personId = 1;

    service.deletePerson$(personId).subscribe(
      (response) => fail('Should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: 'Internal server error' });
      }
    );

    const request = httpMock.expectOne(`/api/people/${personId}`);
    request.flush(
      { message: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });

  it('should update an object', () => {
    const updatedObject: IPerson = {
      id: 1,
      first_name: 'John-new',
      last_name: 'Doe-new',
      email: 'johndoe@example.com',
    };

    service.updatePerson$(updatedObject).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual({ message: 'Person successfully updated' });
    });

    const request = httpMock.expectOne(`/api/people/${updatedObject.id}`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(updatedObject);

    request.flush({ message: 'Person successfully updated' });
  });

  it('should handle errors', () => {
    const updatedObject: IPerson = {
      id: 1,
      first_name: 'John-new',
      last_name: 'Doe-new',
      email: 'johndoe@example.com',
    };

    service.updatePerson$(updatedObject).subscribe(
      (response) => fail('Should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: 'Internal server error' });
      }
    );

    const request = httpMock.expectOne(`/api/people/${updatedObject.id}`);
    request.flush(
      { message: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });

  it('should retrieve a person', () => {
    const objectId = 1;
    const mockResponse = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
    };

    service.getPersonDetail$(objectId).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(`/api/people/${objectId}`);
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should handle errors', () => {
    const objectId = 1;

    service.getPersonDetail$(objectId).subscribe(
      (response) => fail('Should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: 'Internal server error' });
      }
    );

    const request = httpMock.expectOne(`/api/people/${objectId}`);
    request.flush(
      { message: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
});
