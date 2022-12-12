import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlarmServiceService } from './alarm-service.service';
import { InputDialogServiceService } from './input-dialog-service.service';
import { ForegroundService } from '@awesome-cordova-plugins/foreground-service/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AlarmServiceService, InputDialogServiceService, ForegroundService, LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
