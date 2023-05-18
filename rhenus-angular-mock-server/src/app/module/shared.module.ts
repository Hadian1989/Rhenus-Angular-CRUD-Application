import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PeopleComponent } from '../people/people.component';
import { PersonComponent } from '../person/person.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PeopleComponent, PersonComponent],
  imports: [CommonModule, ButtonModule, FormsModule, HttpClientModule],
  exports: [ButtonModule, FormsModule, HttpClientModule],
})
export class SharedModule {}
