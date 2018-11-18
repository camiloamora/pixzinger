import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../providers/services-user/authentication.services';
import { ServicesUserProvider } from '../../providers/services-user/services-user';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthenticationService,
    private userService: ServicesUserProvider,
    private camera: Camera

    ) {
      this.authService.getStatus()
      .subscribe(
        (data) => {
          this.userService.getUserById(data.uid)
          .valueChanges().subscribe(
            (user: User) => {
              this.user = user;
              console.log(this.user);
            },
            (error) => {

            }
          )
        },
        (error) => {
          console.log(error)
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveData() {
    this.userService.editUser(this.user)
    .then( (data) => {
      alert('usuario editado')
      console.log(data)
    })
    .catch( (error) => {
      console.log(error)
    })
  }

  async takePicture(modo: string){
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetWidth: 800,
        targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true
      }
      cameraOptions.sourceType = (modo === 'camera') ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
      const result = await this.camera.getPicture(cameraOptions);
      const image = 'data:image/jpeg;base64,' + result;
      console.log(image);
    } catch (error) {
      console.error(error);
    }
  }

}
