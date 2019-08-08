import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  user;
  
  constructor() { }


getUser(val) {
  this.user = val;
  console.log('User data in provider: ', this.user);

}
returnUser(){
  return this.user;
}
}
