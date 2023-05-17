import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { BaseComponent } from 'src/app/base/base.component';
import { HomeComponent } from 'src/app/home/home.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { LoadingComponent } from 'src/app/loading/loading.component';

@NgModule({
  declarations: [
    BaseComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
  ],
  imports: [CommonModule],
  exports: [HomeComponent, FooterComponent],
})
export class MainModule {}
