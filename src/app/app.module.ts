import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { CreateEventGroupComponent } from './event-groups/create-event-group/create-event-group.component';
import { AddEventComponent } from './event-group/add-event/add-event.component';
import { EditEventComponent } from './event-group/edit-event/edit-event.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, CreateEventGroupComponent, AddEventComponent, EditEventComponent],
  entryComponents: [CreateEventGroupComponent, AddEventComponent, EditEventComponent],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
