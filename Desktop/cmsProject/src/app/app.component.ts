import { Component } from '@angular/core';

import * as firebase from 'firebase';
import { FIREBASE_INFO } from './firebase.info';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InformationService } from './information.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private infoProv: InformationService
  ) {
    firebase.initializeApp(FIREBASE_INFO);
    this.catchUser()
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  catchUser(){
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(!user)
      {
      this.router.navigateByUrl('/');
      unsubscribe();
    }else {
      this.infoProv.getUser(user);
      this.router.navigateByUrl('list');
      unsubscribe();

    }

   })
}

 
}
