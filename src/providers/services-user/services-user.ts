import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Status } from '../../interfaces/user';

/*
  Generated class for the ServicesUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesUserProvider {
  friends: User[]
  constructor() {
    let usuario1: User = {
      name: 'Camilo Mora',
      nick: 'kalufau',
      age: 32,  
      email: 'kalufau@yahoo.com',
      friend:true,
      uid: '1',
      active: true,
      status: Status.Online
    };
    let usuario2: User = {
      name: 'Patricia Bermudez',
      nick: 'Patricia',
      age: 32,  
      email: 'patricia@yahoo.com',
      friend:false,
      uid: '2',
      active: true,
      status: Status.Online
    };
    this.friends = [usuario1, usuario2];
  }

  getFriends(){
    return this.friends;
  }

}
