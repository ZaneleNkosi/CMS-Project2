import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  storage = firebase.storage().ref();
  db = firebase.firestore();
  rooms = []
  displayProfile = {};
  room = {};

  suite = {
    Price: '',
    Type: '',
    Description: '',
    Name: '',
    Mini:'',
    Break:'',
    Satellite:'',
    Wifi: '',
    roomService:'',
    Tea: '',
    Bed: '',
    Bathroom: '',
    Image: '',
  }

  profileImage: string;
  constructor(private router: Router, public loadingCtrl: LoadingController, private InfoProvider: InformationService) {
    console.log(this.rooms);
  }

  ngOnInit() {

    this.getRooms()

    console.log(this.rooms);
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('logged Out');
      this.router.navigateByUrl('/');
    }).catch(function (error) {
      // An error happened.
    });
  }

  getRooms() {
    this.db.collection('hotel').doc('aDJnBKRlpH482p3HwMlM').collection('rooms').get().then(room => {
      room.forEach(doc => {
        this.rooms.push(doc.data());

      })
      this.room = this.rooms[0]
      console.log(this.rooms);
      console.log(this.rooms[0]);
    })
  }

  getroom(val) {
    this.room = val
    console.log(this.room);

  }

  // async getProfile() {
  //   let users = this.db.collection('User Profiles');

  //   let load = await this.loadingCtrl.create({
  //     message: 'Loading'
  //   });
  //   load.present();
  //   // ...query the profile that contains the uid of the currently logged in user...
  //   console.log('Profile User: ', this.InfoProvider.returnUser());
  //   let query = users.where("uid", "==", this.InfoProvider.returnUser().uid);
  //   query.get().then(querySnapshot => {
  //     // ...log the results if the document exists...
  //     if (querySnapshot.empty !== true) {
  //       console.log('Got data', querySnapshot);
  //       querySnapshot.forEach(doc => {
  //         this.displayProfile = doc.data();

  //         console.log('Profile Document: ', this.displayProfile)
  //       })
  //     } else {
  //       console.log('No data');
  //     }
  //     // dismiss the loading
  //     load.dismiss();
  //   }).catch(err => {
  //     // catch any errors that occur with the query.
  //     console.log("Query Results: ", err);
  //     // dismiss the loading
  //     load.dismiss();
  //   })

  // }

  async changeListener(pic) {
    console.log('Image data: ', pic);
    const add = pic.target.files[0]
    const images = this.storage.child(add.name)
    let upload = images.put(add);

    upload.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('suite Picture', progress);

    }, err => {

    }, () => {
      upload.snapshot.ref.getDownloadURL().then(async downURL => {
        console.log('File available at: ', downURL);
        this.suite.Image = downURL

        let load = await this.loadingCtrl.create({

        });
        load.present();

        this.db.collection("hotel").doc('aDJnBKRlpH482p3HwMlM').collection("rooms").doc(this.suite.Name).set(this.suite).then(() => {

        });
        load.dismiss();
      })
    })


  }
}