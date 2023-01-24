import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MarkerService } from './modules/map/services/map/marker.service';
import { PopupService } from './modules/map/services/map/popup.service';
import { ShapeService } from './modules/map/services/map/shape.service';
import { MatChipsModule } from '@angular/material/chips';
import { AppComponent } from './app.component';
import { AccountModule } from './modules/account/account.module';
import { AdministratorModule } from './modules/administrator/administrator.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { DriverModule } from './modules/driver/driver.module';
import { LayoutModule } from './modules/layout/layout.module';
import { MapModule } from './modules/map/map.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { UnregisteredUserModule } from './modules/unregistered-user/unregistered-user.module';
import { AuthInterceptor } from './modules/auth/interceptor/auth-interceptor.interceptor';
import { HistoryModule } from './modules/history/history.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccountModule,
    AdministratorModule,
    AuthModule,
    CommunicationModule,
    DriverModule,
    HistoryModule,
    LayoutModule,
    MapModule,
    PassengerModule,
    UnregisteredUserModule,
    MatChipsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    MarkerService,
    PopupService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
