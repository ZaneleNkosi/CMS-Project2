import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Routes, Router } from '@angular/router';
import { Users } from '../Users';
import { InformationService } from '../information.service';
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
  error = "";
  constructor(private router: Router, private infoProv: InformationService) { }

  ngOnInit() {
    this.catchUser()
  }

  catchUser() {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.router.navigateByUrl('/');
        unsubscribe();
      } else {
        this.infoProv.getUser(user);
        this.router.navigateByUrl('list');
        unsubscribe();
      }
    })
  }

  login() {
    if (!this.email || !this.password){
      this.error = "All fields required"
    }else{
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        this.infoProv.getUser(res);
        console.log(res);
        this.router.navigateByUrl('list');

      }).catch((err) => {
        this.error = err.message
      })
    }
  }

  register() {

    if (!this.email || !this.password){
      this.error = "All fields required"
    }else{
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        this.infoProv.getUser(res);
        console.log(res);
        this.router.navigateByUrl('list');

      }).catch((err) => {
        this.error = err.message
      })
    } 
  }

  showRegister() {
    this.showComp = !this.showComp
  }



}
