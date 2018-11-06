import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Status } from '../../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the ServicesUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesUserProvider {
  friends: User[]
  constructor(private angularFireDatabase: AngularFireDatabase) {
    // let usuario1: User = {
    //   name: 'Camilo Mora',
    //   nick: 'kalufau',
    //   age: 32,  
    //   email: 'kalufau@yahoo.com',
    //   friend:true,
    //   uid: '1',
    //   active: true,
    //   status: Status.Online
    // };
    // let usuario2: User = {
    //   name: 'Patricia Bermudez',
    //   nick: 'Patricia',
    //   age: 32,  
    //   email: 'patricia@yahoo.com',
    //   friend:false,
    //   uid: '2',
    //   active: true,
    //   status: Status.AppearOffline
    // };
    // let usuario3: User = {
    //   name: 'Carlos jose',
    //   nick: 'Carlos',
    //   age: 38,  
    //   email: 'carlos@yahoo.com',
    //   friend:false,
    //   uid: '2',
    //   active: true,
    //   status: Status.Away
    // };
    // this.friends = [usuario1, usuario2, usuario3];
  }

  // getFriends(){
  //   return this.friends;
  // }
  getUsers() {
    return this.angularFireDatabase.list('users/');
  }
  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  editUser(user){
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
}
