import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MarkerService } from './modules/map/services/map/marker.service';
import { PopupService } from './modules/map/services/map/popup.service';
import { ShapeService } from './modules/map/services/map/shape.service';

import { AppComponent } from './app.component';
import { AccountModule } from './modules/account/account.module';
import { AdministratorModule } from './modules/administrator/administrator.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { DriverModule } from './modules/driver/driver.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MapModule } from './modules/map/map.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { UnregisteredUserModule } from './modules/unregistered-user/unregistered-user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AccountModule,
    AdministratorModule,
    AuthModule,
    CommunicationModule,
    DriverModule,
    LayoutModule,
    MapModule,
    PassengerModule,
    UnregisteredUserModule,
    AppRoutingModule
  ],
  providers: [
    // {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    MarkerService,
    PopupService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
