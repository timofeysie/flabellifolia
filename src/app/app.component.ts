import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OwlPage } from '../pages/owl/owl';
import { PlanePage } from '../pages/plane/plane';
import { OceanPage } from '../pages/ocean/ocean';
import { FlipBoxPage } from '../pages/flip-box/flip-box';
import { OptionsPage } from '../pages/options/options';
import { ThemeService } from '../providers/theme/theme';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      private theme: ThemeService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Cube', component: HomePage },
      { title: 'Owl', component: OwlPage },
      { title: 'Mushroom', component: ListPage },
      { title: 'Plane', component: PlanePage },
      { title: 'Ocean', component: OceanPage },
      { title: 'Flip Box', component: FlipBoxPage },
      { title: 'Options', component: OptionsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.theme.setTheme('neon');
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
