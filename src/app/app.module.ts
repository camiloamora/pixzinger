import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { ConversationPageModule } from '../pages/conversation/conversation.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { AboutPageModule } from '../pages/about/about.module';
import { ServicesUserProvider } from '../providers/services-user/services-user';
import { SearchPipe } from '../pipes/search';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticationService } from '../providers/services-user/authentication.services';

export const firebaseConfig = {
  apiKey: "AIzaSyAI5enqsYpY6OTl7VOhjhaqGxkXbuKpffo",
  authDomain: "pixzinger.firebaseapp.com",
  databaseURL: "https://pixzinger.firebaseio.com",
  projectId: "pixzinger",
  storageBucket: "pixzinger.appspot.com",
  messagingSenderId: "1284497989"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    ConversationPageModule,
    ProfilePageModule,
    AboutPageModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesUserProvider,
    AuthenticationService
  ]
})
export class AppModule {}
