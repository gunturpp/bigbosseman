import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
// import { UploadProductPage } from '../pages/upload-product/upload-product';

var firebaseConfig = {
  apiKey: "AIzaSyC00WQuOWVYxEtGQ4vwOe0z3YBtZTrsSqU",
  authDomain: "bigbosseman-1.firebaseapp.com",
  databaseURL: "https://bigbosseman-1.firebaseio.com",
  projectId: "bigbosseman-1",
  storageBucket: "bigbosseman-1.appspot.com",
  messagingSenderId: "785945219706"
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  // rootPage = UploadProductPage;
  rootPage = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);
  }
  
}