import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { AuthenticationService } from '../providers/services-user/authentication.services';
import { ServicesUserProvider } from '../providers/services-user/services-user';
import { User } from '../interfaces/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  user: User;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private authService: AuthenticationService,
    private userService: ServicesUserProvider,
    public app: App) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage },
    //   { title: 'Login', component: LoginPage },
    //   { title: 'Conversation', component: ConversationPage },
    //   { title: 'Profile', component: ProfilePage },
    //   { title: 'About', component: AboutPage }
    // ];

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage }
    ];
    this.authService.getStatus().subscribe((session) => {
      if (!session) {
        return;
      }
      if (!session.uid) {
        return;
      }
      this.userService.getUserById(session.uid)
      .valueChanges()
      .subscribe((user: User) => {
        this.user = user;
        // this.getFriendRequests();
      }, (error) => {console.log(error);})
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authService.logOut()
    .then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
