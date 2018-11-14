import { Component } from '@angular/core';
import { NavController, UrlSerializer, AlertController, ToastController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { User, Status } from './../../interfaces/user';
import { ServicesUserProvider } from '../../providers/services-user/services-user';
import { AuthenticationService } from '../../providers/services-user/authentication.services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friends: User[]
  query: string = '';
  status: Status
  user: User;
  constructor(public navCtrl: NavController, 
    public userService: ServicesUserProvider, 
    private alertController: AlertController, 
    private authService: AuthenticationService,
    public toastController: ToastController) {
    const usersObservable = this.userService.getUsers();
    usersObservable.valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      alert('Ocurrió un error');
      console.log(error);
    });
    this.authService.getStatus().subscribe((session) => {
      if (!session) {
        return;
      }
      if (!session.uid) {
        return;
      }
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
      }, (error) => {
        console.log(error);
      })
    }, (error) => {console.log(error);})
  }

  goToConversation(user) {
    this.navCtrl.push(ConversationPage, {
      uid: user.uid
    });
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  getIconByStatus(status) {
    let icon = '';
    switch (status) {
      case 'Online':
        icon = 'logo_live_online.png'
        break;
      case 'Offline':
        icon = 'logo_live_offline.png'
        break;
      case 'Busy':
        icon = 'logo_live_busy.png'
        break;
      case 'Away':
        icon = 'logo_live_away.png'
        break;
      case 'AppearOffline':
        icon = 'logo_live_appear_offline.png'
        break;
    }
    return icon;
  }

}
