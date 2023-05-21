import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PeopleModule } from './module/people.module';
import { AppRoutingModule } from './module/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatePersonComponent } from './update-person/update-person.component';

@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PeopleModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
