import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RelatorioPage } from '../pages/relatorio/relatorio';
import { CategoriaPage } from '../pages/categoria/categoria';

const config = {
  apiKey: "AIzaSyADuWXG_cQ5IbU4fkurKK6E4Vb80ldIf_E",
  authDomain: "adreport-f4708.firebaseapp.com",
  databaseURL: "https://adreport-f4708.firebaseio.com",
  projectId: "adreport-f4708",
  storageBucket: "adreport-f4708.appspot.com",
  messagingSenderId: "290244851121"
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = RelatorioPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
