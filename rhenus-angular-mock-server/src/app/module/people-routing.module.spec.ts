import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleComponent } from 'src/app/people/people.component';
import { PersonComponent } from 'src/app/person/person.component';
import { PeopleRoutingModule } from './people-routing.module';
import { Router } from '@angular/router';

describe('PeopleRoutingModule', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), PeopleRoutingModule],
      declarations: [PeopleComponent, PersonComponent]
    });

    router = TestBed.inject(Router);
  });

  it('should navigate to people', () => {
    const navigateSpy = spyOn(router, 'navigate');

    router.navigate(['']);

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should navigate to person with given ID', () => {
    const navigateSpy = spyOn(router, 'navigate');

    router.navigate(['person', '2']);

    expect(navigateSpy).toHaveBeenCalledWith(['person', '2']);
  });

});
