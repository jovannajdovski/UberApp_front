import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MarkerService } from './services/map/marker.service';
import { PopupService } from './services/map/popup.service';
import { ShapeService } from './services/map/shape.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupOptionsComponent } from './components/signup-options/signup-options.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RouteFormComponent } from './components/route-form/route-form.component';
import { EstimatedRoutesComponent } from './components/estimated-routes/estimated-routes.component';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { UnregisteredUserHomeComponent } from './components/unregistered-user-home/unregistered-user-home/unregistered-user-home.component';
import { MapComponent } from './components/map/map/map.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UnregisteredUserRoutesComponent } from './components/unregistered-user-routes/unregistered-user-routes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    SignupOptionsComponent,
    SignupFormComponent,
    RouteFormComponent,
    EstimatedRoutesComponent,
    DriverHomeComponent,
    UnregisteredUserHomeComponent,
    MapComponent,
    ForgotPasswordComponent,
    PasswordChangedComponent,
    ResetPasswordComponent,
    UnregisteredUserRoutesComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    //FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    MarkerService,
    PopupService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
