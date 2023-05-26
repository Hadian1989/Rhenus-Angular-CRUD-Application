import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * This module defines the main routing configuration for the Angular application.
 */

export const routes: Routes = [
  // Redirects the root URL to the 'people' route
  { path: '', pathMatch: 'full', redirectTo: '/people' },
  // Lazily loads the 'PeopleRoutingModule' module for the 'people' route
  {
    path: 'people',
    loadChildren: () =>
      import('./people-routing.module').then((m) => m.PeopleRoutingModule),
  },
  // Redirects any unknown route to the root URL
  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
