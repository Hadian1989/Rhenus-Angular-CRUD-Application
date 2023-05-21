import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleComponent } from './people.component';
import { PeopleModule } from '../module/people.module';
import { spyOnClass } from 'jasmine-es6-spies';
import { PersonApiServices } from '../services/person-api-services';
import { of } from 'rxjs';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let personApiService: jasmine.SpyObj<PersonApiServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent],
      imports: [PeopleModule],
      providers: [
        {
          provide: PersonApiServices,
          useFactory: () => spyOnClass(PersonApiServices),
        },
      ],
    }).compileComponents();
    beforeEach(async() => {
      personApiService = TestBed.get(PersonApiServices);
      personApiService.getPeople$.and.returnValue(
        of([
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
            id: 12,
          },
          {
            first_name: 'Math',
            last_name: 'Henkler',
            email: 'math.henkler@gmail.com',
            id: 13,
          },
          {
            first_name: 'jafar',
            last_name: 'jafarlast',
            email: 'jafa@hsdgs.djdj',
            id: 14,
          },
          {
            first_name: '78ijk',
            last_name: 'dgfh',
            email: 'vnbm@nmn.bvnb',
            id: 8,
          },
          {
            first_name: 'zcz',
            last_name: 'zdf',
            email: 'das@dfs',
            id: 9,
          },
          {
            first_name: 'Ghazaleh',
            last_name: 'Hadian',
            email: 'ghazal@gmail.com',
            id: 15,
          },
        ])
      );
      fixture.detectChanges();
    });
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show people list table', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="people"]')
    ).toBeTruthy();
  });
  it('should show create person button', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="create button"]')
    ).toBeTruthy();
  });
  it('should show people ', () => {
    expect(
      fixture.nativeElement.querySelectorAll('[data-test="people"]').length
    ).toBe(3);
  });
  it('should show a person person info ', () => {
    const person = fixture.nativeElement.querySelector('[data-test="people"]');
    expect(person.querySelector('[data-test="email"]').innerText).toEqual(
      'ghazal@gmail.com'
    );
  });
});
