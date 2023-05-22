import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { PersonComponent } from './person.component';
import { PersonApiServices } from '../services/person-api-services';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let personApiServiceSpy: jasmine.SpyObj<PersonApiServices>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;
  let routeStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    personApiServiceSpy = jasmine.createSpyObj('PersonApiServices', [
      'getPersonDetail$',
      'deletePerson$',
    ]);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    activatedRouteStub = {
      params: of({ id: 1 }), // Mocking ActivatedRoute params with id = 1
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PersonComponent],
      providers: [
        FormBuilder,
        { provide: PersonApiServices, useValue: personApiServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    personApiServiceSpy = TestBed.inject(
      PersonApiServices
    ) as jasmine.SpyObj<PersonApiServices>;
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    routeStub = TestBed.inject(ActivatedRoute) as Partial<ActivatedRoute>;
    component.id_quary = 1; // Set a value for id_quary

    personApiServiceSpy.getPersonDetail$.and.returnValue(
      of({
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
      })
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get person detail on initialization', () => {
    const personDetail = {
      id: 1,
      email: 'test@example.com',
      last_name: 'Doe',
      first_name: 'John',
    };
    personApiServiceSpy.getPersonDetail$.and.returnValue(of(personDetail));
    component.ngOnInit();
    expect(component.personForm.value).toEqual(personDetail);
    expect(personApiServiceSpy.getPersonDetail$).toHaveBeenCalledWith(1);
  });

  it('should display error message on delete person failure', () => {
    const personId = 1;
    const errorMessage = 'Error deleting person';
    personApiServiceSpy.deletePerson$.and.returnValue(of({ errorMessage }));
    component.deletePerson();
    expect(personApiServiceSpy.deletePerson$).toHaveBeenCalledWith(personId);
  });

  it('should call deletePerson$ and display success message on successful deletion', () => {
    personApiServiceSpy.deletePerson$.and.returnValue(of({}));
    component.deletePerson();
    expect(personApiServiceSpy.deletePerson$).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
