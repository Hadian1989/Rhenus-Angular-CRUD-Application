import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from './app-routing.module';

describe('AppRoutingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppRoutingModule],
    }).compileComponents();
  }));

  it('should contain routes', () => {
    const appRoutingModule = TestBed.inject(AppRoutingModule);
    expect(appRoutingModule).toBeDefined();
    expect(routes).toBeDefined();
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should have a default route for empty path', () => {
    const defaultRoute = routes.find((route) => route.path === '');
    expect(defaultRoute).toBeDefined();
    expect(defaultRoute?.pathMatch).toEqual('full');
    expect(defaultRoute?.redirectTo).toEqual('/people');
  });

  it('should have a route for "/people" path with lazy loading', () => {
    const peopleRoute = routes.find((route) => route.path === 'people');
    expect(peopleRoute).toBeDefined();
    expect(peopleRoute?.loadChildren).toEqual(jasmine.any(Function));

  });

  it('should have a redirect route for "*" path', () => {
    const redirectRoute = routes.find((route) => route.path === '*');
    expect(redirectRoute).toBeDefined();
    expect(redirectRoute?.redirectTo).toEqual('');
  });
});
