import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from 'src/app/people/people.component';
import { PersonComponent } from 'src/app/person/person.component';


export const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'person/:id', component: PersonComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PeopleRoutingModule { }
