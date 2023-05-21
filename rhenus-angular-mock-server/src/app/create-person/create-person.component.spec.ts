import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonComponent } from './create-person.component';
import { PeopleModule } from '../module/people.module';

describe('CreatePersonComponent', () => {
  let component: CreatePersonComponent;
  let fixture: ComponentFixture<CreatePersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePersonComponent],
      imports: [PeopleModule],

    });
    fixture = TestBed.createComponent(CreatePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
