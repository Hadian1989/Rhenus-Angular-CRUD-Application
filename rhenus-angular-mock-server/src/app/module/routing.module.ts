import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from '../people/people.component';
import { PersonComponent } from '../person/person.component';


export const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'person', component: PersonComponent },

  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class RoutingModule {}
