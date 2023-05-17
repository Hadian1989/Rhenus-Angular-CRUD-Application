import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainModule } from './modules/main/main.module';
import { RoutingModule } from './modules/routing/routing.module';
import { PeopleComponent } from './people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PeopleComponent,
  ],
  imports: [BrowserModule, RoutingModule, MainModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
