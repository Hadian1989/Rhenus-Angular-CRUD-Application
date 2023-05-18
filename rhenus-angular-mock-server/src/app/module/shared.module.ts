import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PeopleComponent } from '../people/people.component';
import { PersonComponent } from '../person/person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [PeopleComponent, PersonComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    RoutingModule,
  ],
  exports: [ButtonModule, FormsModule, HttpClientModule, DialogModule],
})
export class SharedModule {}
