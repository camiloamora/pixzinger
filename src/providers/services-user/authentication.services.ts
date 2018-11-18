import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { destroyPlatform } from '../../../platforms/android/app/src/main/assets/www/build/vendor';
import { Facebook } from "@ionic-native/facebook";

@Injectable()
export class AuthenticationService {
    constructor(private angularFireAuth: AngularFireAuth,
    private fb: Facebook){
    }

    loginWithEmail(email: string,password: string){
        return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    registerWithEmail(email: string,password: string){
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    getStatus(){
        return this.angularFireAuth.authState;
    }

    logOut(){
        return this.angularFireAuth.auth.signOut();
    }

    facebookLogin(){
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.angularFireAuth.auth.signInWithPopup(provider);
    }
    
    facebookLoginNative(){
        return this.fb.login(['email', 'public_profile']).then(res => {
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            return firebase.auth().signInWithCredential(facebookCredential);
          })
    }
}