import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatePersonComponent } from './update-person.component';
import { PersonApiServices } from '../services/person-api-services';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UpdatePersonComponent', () => {
  let component: UpdatePersonComponent;
  let fixture: ComponentFixture<UpdatePersonComponent>;
  let messageService: jasmine.SpyObj<MessageService>;
  let personApiServiceSpy: jasmine.SpyObj<PersonApiServices>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const personApiSpy = jasmine.createSpyObj('PersonApiServices', [
      'updatePerson$',
    ]);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UpdatePersonComponent],
      providers: [
        FormBuilder,
        { provide: PersonApiServices, useValue: personApiSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UpdatePersonComponent);
        component = fixture.componentInstance;
        component.person = new FormBuilder().group({
          id: ['1'],
          email: ['test@example.com'],
          last_name: ['Doe'],
          first_name: ['John'],
        });
        fixture.detectChanges();
      });
    personApiServiceSpy = TestBed.inject(
      PersonApiServices
    ) as jasmine.SpyObj<PersonApiServices>; // Assign the spy object to personApiServiceSpy

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>; // Assign the spy object to messageService
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should call the cancelPersonDetail method and navigate to the person view', () => {
    spyOn(component.isEditingFormFinished, 'emit');
    spyOn(component.personForm, 'reset');

    component.cancelPersonDetail();

    expect(component.isEditingFormFinished.emit).toHaveBeenCalledWith(true);
    expect(component.personForm.reset).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/person/1']);
  });

  it('should initialize the form with correct values', () => {
    expect(component.personForm.value).toEqual({
      id: '1',
      email: 'test@example.com',
      last_name: 'Doe',
      first_name: 'John',
    });
  });

  it('should emit isEditFormSubmitted event and reset form on cancelPersonDetail', () => {
    spyOn(component.isEditingFormFinished, 'emit');
    spyOn(component.personForm, 'reset');

    component.cancelPersonDetail();

    expect(component.isEditingFormFinished.emit).toHaveBeenCalledWith(true);
    expect(component.personForm.reset).toHaveBeenCalled();
  });

  it('should navigate to person detail page on cancelPersonDetail', () => {
    component.cancelPersonDetail();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/person/1']);
  });
  it('should call updatePerson$ method on updateDetail', () => {
    personApiServiceSpy.updatePerson$.and.returnValue(of({}));

    component.updateDetail();

    expect(personApiServiceSpy.updatePerson$).toHaveBeenCalled();
  });
  it('should emit isEditFormSubmitted event and reset form on successful update', () => {
    personApiServiceSpy.updatePerson$.and.returnValue(of({}));

    spyOn(component.isEditingFormFinished, 'emit');
    spyOn(component.personForm, 'reset');

    component.updateDetail();

    expect(component.isEditingFormFinished.emit).toHaveBeenCalledWith(true);
    expect(component.personForm.reset).toHaveBeenCalled();
  });
  it('should navigate to person detail page on successful update', () => {
    personApiServiceSpy.updatePerson$.and.returnValue(of({}));

    component.updateDetail();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/person/1']);
  });
  it('should display error message on update error', () => {
    const error = 'Update failed';
    personApiServiceSpy.updatePerson$.and.returnValue(
      new Observable((observer) => {
        observer.error(error);
      })
    );

    component.updateDetail();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  });
});
