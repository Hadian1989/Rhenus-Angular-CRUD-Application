import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CreatePersonComponent } from './create-person.component';
import { PersonApiServices } from '../services/person-api-services';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { INewPerson } from '../models/person';
import { PeopleModule } from '../module/people.module';
import { MessageService } from 'primeng/api';

describe('CreatePersonComponent', () => {
  let component: CreatePersonComponent;
  let fixture: ComponentFixture<CreatePersonComponent>;
  let personApiService: PersonApiServices;
  let router: Router;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PeopleModule],
      declarations: [CreatePersonComponent],
      providers: [
        PersonApiServices,
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonComponent);
    component = fixture.componentInstance;
    personApiService = TestBed.inject(PersonApiServices);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addPerson$ method on personApiService when createPerson is called', () => {
    const addPersonSpy = spyOn(personApiService, 'addPerson$').and.returnValue(
      of({})
    );
    const person: INewPerson = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
    };
    component.personForm.controls['first_name'].setValue(person.first_name);
    component.personForm.controls['last_name'].setValue(person.last_name);
    component.personForm.controls['email'].setValue(person.email);

    component.createPerson();

    expect(addPersonSpy).toHaveBeenCalledWith(person);
  });

  it('should reset the form and navigate to home after successful person creation', () => {
    spyOn(personApiService, 'addPerson$').and.returnValue(of({}));
    const resetSpy = spyOn(component.personForm, 'reset');
    component.createPerson();

    expect(resetSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should emit isCreateFormSubmitted event after successful person creation', () => {
    spyOn(personApiService, 'addPerson$').and.returnValue(of({}));
    const emitSpy = spyOn(component.isCreateFormSubmitted, 'emit');
    component.createPerson();

    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should emit isCreateFormSubmitted event and reset the form when cancelCreateModal is called', () => {
    const emitSpy = spyOn(component.isCreateFormSubmitted, 'emit');
    const resetSpy = spyOn(component.personForm, 'reset');
    component.cancelCreateModal();

    expect(emitSpy).toHaveBeenCalledWith(true);
    expect(resetSpy).toHaveBeenCalled();
  });
});
