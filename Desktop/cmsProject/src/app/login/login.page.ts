import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Routes, Router } from '@angular/router';
import { Users } from '../Users';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as Users;
  db = firebase.firestore();
  text: string;
  showComp = true;
  email;
  password;
  username;
 
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  logout() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        console.log(res);
        this.router.navigateByUrl('list');

      })
  }

 register() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        console.log(res);
        this.router.navigateByUrl('list');
      })
  }

  

  showRegister() {
    this.showComp = !this.showComp
  }
}
