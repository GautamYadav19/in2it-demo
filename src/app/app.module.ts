import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './Shared/Header/navbar/navbar.component';
import { IconsModule } from './Shared/icons/icons.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
