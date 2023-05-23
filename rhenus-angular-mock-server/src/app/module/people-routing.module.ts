import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from 'src/app/people/people.component';
import { PersonComponent } from 'src/app/person/person.component';


export const people_routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'person/:id', component: PersonComponent},

];

@NgModule({
  imports: [RouterModule.forChild(people_routes)],
  exports: [RouterModule]
})

export class PeopleRoutingModule { }
