import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PeopleComponent } from '../people/people.component';
import { PersonComponent } from '../person/person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { PeopleRoutingModule } from './people-routing.module';
import { CreatePersonComponent } from '../create-person/create-person.component';
import { UpdatePersonComponent } from '../update-person/update-person.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    PeopleComponent,
    PersonComponent,
    CreatePersonComponent,
    UpdatePersonComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    AppRoutingModule,
    TableModule,
    ToastModule,
    TooltipModule,
    PeopleRoutingModule,
    ConfirmPopupModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    AppRoutingModule,
    TableModule,
    ToastModule,
    TooltipModule,
    PeopleRoutingModule,
    ConfirmPopupModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class PeopleModule {}
