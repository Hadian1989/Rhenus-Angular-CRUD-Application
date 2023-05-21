import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



export const routes: Routes = [
  { path: '', loadChildren: () => import('./people-routing.module').then(m => m.PeopleRoutingModule) },
  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
