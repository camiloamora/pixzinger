import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesUserProvider } from '../../providers/services-user/services-user';
import { User } from '../../interfaces/user';
import { ConversationPageModule } from './conversation.module';

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
  
  uid: string;
  friends: User[]
  friend: User

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: ServicesUserProvider) {
      
      this.uid = this.navParams.get('uid');
      console.log(this.uid)
      this.userService.getUserById(this.uid).valueChanges().subscribe(
        (data: User) => {
          console.log('data',data)
          this.friend = data;
        },
        (error) => {
          console.log(error)
        }
      )
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
