import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';


const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class RoutingModule {}
