/**
 * This module handles the routing configuration for the 'People' feature of the Angular application.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from 'src/app/people/people.component';
import { PersonComponent } from 'src/app/person/person.component';

// Define the routes for the 'People' feature
export const people_routes: Routes = [
  { path: '', component: PeopleComponent }, // Default route for the people list page
  { path: 'person/:id', component: PersonComponent }, // Route for the person detail page with a dynamic ID parameter
];

@NgModule({
  imports: [RouterModule.forChild(people_routes)],
  exports: [RouterModule]
})

export class PeopleRoutingModule { }
