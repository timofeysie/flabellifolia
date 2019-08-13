import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OwlPage } from '../pages/owl/owl';
import { PlanePage } from '../pages/plane/plane';
import { OceanPage } from '../pages/ocean/ocean';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as THREE from 'three';
import { DirectivesModule } from '../directives/directives.module';
import { FlipBoxPageModule } from '../pages/flip-box/flip-box.module';
import { FlipBoxPage } from '../pages/flip-box/flip-box';
import { ThemeService } from '../providers/theme/theme';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OwlPage,
    PlanePage,
    OceanPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    FlipBoxPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    OwlPage,
    PlanePage,
    OceanPage,
    FlipBoxPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DirectivesModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ThemeService
  ]
})
export class AppModule {}
