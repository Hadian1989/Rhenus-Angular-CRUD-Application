import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { BaseComponent } from 'src/app/base/base.component';
import { HomeComponent } from 'src/app/home/home.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { PeopleComponent } from 'src/app/people/people.component';
import { PersonComponent } from 'src/app/person/person.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BaseComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    PeopleComponent,
    PersonComponent,
  ],
  imports: [CommonModule,TableModule,PanelModule,ReactiveFormsModule],
  exports: [HomeComponent, FooterComponent,TableModule,PanelModule,ReactiveFormsModule],
})
export class MainModule {}
