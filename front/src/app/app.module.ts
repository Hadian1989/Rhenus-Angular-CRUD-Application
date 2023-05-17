import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainModule } from './modules/main/main.module';
import { RoutingModule } from './modules/routing/routing.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, RoutingModule, MainModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
