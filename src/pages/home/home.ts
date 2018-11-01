import { Component } from '@angular/core';
import { NavController, UrlSerializer } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { User, Status } from './../../interfaces/user';
import { ServicesUserProvider } from '../../providers/services-user/services-user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friends: User[]
  query: string = '';
  constructor(public navCtrl: NavController, private userService: ServicesUserProvider) {
    this.friends = userService.getFriends();
  }

  goToConversation(user){
    this.navCtrl.push(ConversationPage, {
      id: user.uid
    });
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
