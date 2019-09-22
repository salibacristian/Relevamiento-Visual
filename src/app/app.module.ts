import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore'
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA9FuQw_mTGYgy-4ecv7BKUULl6L8e8RFo",
  authDomain: "myapp-fcbfd.firebaseapp.com",
  databaseURL: "https://myapp-fcbfd.firebaseio.com",
  projectId: "myapp-fcbfd",
  storageBucket: "myapp-fcbfd.appspot.com",
  messagingSenderId: "687611359987",
  appId: "1:687611359987:web:1a78f70e59c9dacfa2bd86"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue:{}},
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
