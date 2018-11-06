import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesUserProvider } from '../../providers/services-user/services-user';
import { User } from '../../interfaces/user';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  
  id: string;
  friends: User[]
  friend: User

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: ServicesUserProvider) {
      
      this.id = this.navParams.get('id');
      console.log(this.id)
      // this.friends = this.userService.getFriends();
      // this.friend = this.friends.find((friend) => {
      //   return friend.uid === this.id
      // });  
      // this.friend = this.friends.find((friend) => {
      //   return friend.uid === this.
      // });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ConversationPage');
    
  }

  goBack() {
    this.navCtrl.pop();
  }

}
