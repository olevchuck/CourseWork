import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import {QueryService} from './services/query.service';
import {AuthService} from './services/auth.service';
import { MainComponent } from './main/main.component';
import {CookieService} from 'angular2-cookie/core';
import {MusicService} from './services/music.service';
import {SecondsToTimePipe} from './secondsToTime.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    SecondsToTimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    QueryService,
    AuthService,
    CookieService,
    MusicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
