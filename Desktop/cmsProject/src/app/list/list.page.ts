import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingController, AlertController } from '@ionic/angular';
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
    docname: '',
    Mini: '',
    Break: '',
    Satellite: '',
    Wifi: '',
    roomService: '',
    Tea: '',
    Bed: '',
    Bathroom: '',
    Image: '',
  }

  profileImage: string;
  displayBooking = [];
  uid;
  constructor(public alertCtrl: AlertController, private router: Router, public loadingCtrl: LoadingController, private infoProvider: InformationService) {
    console.log(this.rooms);

  }

  ngOnInit() {

    this.uid = firebase.auth().onAuthStateChanged(res => {
      this.uid = res.uid;
      this.getRooms()
      this.retrieveBooking()
      this.retrieveData()
    })

    // this.retrieveProfile()

    // this.deleteRoom()
    console.log(this.rooms);
    console.log('User: ', this.infoProvider.returnUser());
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

  //adding a pic and saving new room to database
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

  //Deleting a room
  async deleteRoom(room) {

    const confirm = await this.alertCtrl.create({

      message: 'Are you sure you want to delete this suite?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.db.collection('hotel').doc('aDJnBKRlpH482p3HwMlM').collection('rooms').doc(room.Name).delete().then(() => {

              console.log("Document successfully deleted!");
            }).catch(function (error) {
              console.error("Error removing document: ", error);
            });
          }
        }
      ]
    });
    confirm.present();


  }

  //Retrieving a profile
  async retrieveData() {

    let users = this.db.collection('User Profiles');

    let load = await this.loadingCtrl.create({

    });
    load.present();
    // ...query the profile that contains the uid of the currently logged in user...
    console.log('Profile User: ', this.infoProvider.returnUser());
    let query = users.where("uid", "==", this.infoProvider.returnUser().uid);
    query.get().then(querySnapshot => {
      // ...log the results if the document exists...
      if (querySnapshot.empty !== true) {
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          this.displayProfile = doc.data();

          console.log('Profile Document: ', this.displayProfile)
        })
      } else {
        console.log('No data');
      }
      // dismiss the loading
      load.dismiss();
    }).catch(err => {
      // catch any errors that occur with the query.
      console.log("Query Results: ", err);
      // dismiss the loading
      load.dismiss();
    })
  }


  async retrieveBooking() {
    let users = this.db.collection('bookings');
    let load = await this.loadingCtrl.create({
    });
    load.present();
    // ...query the Booking that contains the uid of the currently logged in user...
    console.log('User Bookings: ', this.infoProvider.returnUser());
    let query = users.get().then(querySnapshot => {
      // ...log the results if the document exists...
      if (querySnapshot.empty !== true) {
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          this.displayBooking.push(doc.data());
          console.log('Booking Document: ', this.displayBooking)
          // console.log('bookings', doc.data());  
        });

      } else {

        console.log('No Booking data');
      }
      // dismiss the loading
      load.dismiss();
    }).catch(err => {
      // catch any errors that occur with the query.
      console.log("Query Results: ", err);
      // dismiss the loading
      load.dismiss();
    });
  }


}