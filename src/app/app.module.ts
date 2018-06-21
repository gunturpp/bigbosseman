import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { DatabaseProvider } from '../providers/database/database';
import { DataProvider } from '../providers/data/data';
import { AuthProvider } from '../providers/auth/auth';
import { LoadingProvider } from '../providers/loading/loading';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomeadminPage } from '../pages/homeadmin/homeadmin';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { UploadProductPage } from '../pages/upload-product/upload-product';

const firebaseConfig = {
  apiKey: "AIzaSyC00WQuOWVYxEtGQ4vwOe0z3YBtZTrsSqU",
  authDomain: "bigbosseman-1.firebaseapp.com",
  databaseURL: "https://bigbosseman-1.firebaseio.com",
  projectId: "bigbosseman-1",
  storageBucket: "bigbosseman-1.appspot.com",
  messagingSenderId: "785945219706"
};

@NgModule({
  declarations: [
    UploadProductPage,
    ProfileEditPage,
    ProfilePage,    
    HomeadminPage,
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    // Http,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UploadProductPage,
    ProfileEditPage,
    ProfilePage,    
    HomeadminPage,
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImageProvider,
    PreloaderProvider,
    DatabaseProvider,
    DataProvider,
    AuthProvider,
    LoadingProvider,
    ImageProvider
  ]
})
export class AppModule {}
