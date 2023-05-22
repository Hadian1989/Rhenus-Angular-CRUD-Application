import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PeopleComponent } from './people.component';
import { PersonApiServices } from '../services/person-api-services';
import { MessageService } from 'primeng/api';
import { IPerson } from '../models/person';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let personApiServiceSpy: jasmine.SpyObj<PersonApiServices>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const personApiServiceSpyObj = jasmine.createSpyObj<PersonApiServices>(
      'PersonApiServices',
      ['getPeople$', 'deletePerson$']
    );
    const messageServiceSpyObj = jasmine.createSpyObj<MessageService>(
      'MessageService',
      ['add']
    );
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PeopleComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PersonApiServices, useValue: personApiServiceSpyObj },
        { provide: MessageService, useValue: messageServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    personApiServiceSpy = TestBed.inject(
      PersonApiServices
    ) as jasmine.SpyObj<PersonApiServices>;
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    // Mock the getPeople$ method to return a sample list of people
    personApiServiceSpy.getPeople$.and.returnValue(
      of([
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
        },
      ])
    );

    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch people on initialization', () => {
    const mockPeople: IPerson[] = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
      },
    ];
    personApiServiceSpy.getPeople$.and.returnValue(of(mockPeople));

    component.ngOnInit();

    expect(personApiServiceSpy.getPeople$).toHaveBeenCalled();
    expect(component.people).toEqual(mockPeople);
  });

  it('should submit create form', () => {
    const mockEvent = {
      /* mock event data */
    };
    spyOn(component, 'getPeople');

    component.onSubmitCreateForm(mockEvent);

    expect(component.isCreateFormSubmitted).toBe(mockEvent);
    expect(component.showCreateModal).toBeFalsy();
    expect(component.getPeople).toHaveBeenCalled();
  });

  it('should navigate to person detail on click edit detail', () => {
    const mockPersonId = 1;
    component.onClickEditDetail(mockPersonId);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      `/person/${mockPersonId}`,
    ]);
  });
  it('should navigate to person detail on click view detail', () => {
    const mockPersonId = 1;
    component.onClickEditDetail(mockPersonId);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      `/person/${mockPersonId}`,
    ]);
  });
});
