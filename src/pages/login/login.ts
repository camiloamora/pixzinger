import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthenticationService } from '../../providers/services-user/authentication.services';
import { ServicesUserProvider } from '../../providers/services-user/services-user';
import { User, Status } from '../../interfaces/user';
import { HomePage } from '../home/home';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  operation: string = 'login'
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationService: AuthenticationService,
    private userService: ServicesUserProvider,
    private toastCtrl: ToastController,
    private platform: Platform) {
  }

  //función cuando ya esta cargada la vista
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.operation)
  }

  login(){
    this.authenticationService.loginWithEmail(this.email, this.password)
    .then((result) => {
      console.log(result)
    })
    .catch((error)=>{
      console.log(error)
    })
    // .then((result) => {
    //   alert('logueado')
    //   console.log(result)
    // }).catch((err) => {
    //   console.log(err);
    // });
  }

  register(){
    this.authenticationService.registerWithEmail(this.email, this.password)
    .then((result) => {
      console.log(result)
      const user = {
        uid: result.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.userService.createUser(user)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  goBack() {
    this.navCtrl.pop();
  }

  loginWithFacebbok(){
    if(this.platform.is('cordova')){
      this.authenticationService.facebookLoginNative()
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('error',error)
      })
    }
    this.authenticationService.facebookLogin()
    .then((data) => {
      console.log('data', data)
      if(data.additionalUserInfo.isNewUser){
        //register
        const user: User = {
          nick: data.additionalUserInfo.profile['name'],
          active: true,
          status: Status.Online,
          uid: data.user.uid,
          email: data.user.email
        }
        this.userService.createUser(user)
        .then((data) => {
          //console.log(data)
          let toast = this.toastCtrl.create({
            message: 'Bienvenido, Registro exitoso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        let toast = this.toastCtrl.create({
          message: 'Bienvenido',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

}
