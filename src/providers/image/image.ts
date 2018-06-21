import { App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { LoadingProvider } from '../loading/loading';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataProvider } from "../../providers/data/data";

@Injectable()
export class ImageProvider {
  // Image Provider
  // This is the provider class for most of the image processing including uploading images to Firebase.
  // Take note that the default function here uploads the file in .jpg. If you plan to use other encoding types, make sure to
  // set the encodingType before uploading the image on Firebase.
  // Example for .png:
  // data:image/jpeg;base64 -> data:image/png;base64
  // generateFilename to return .png
  private profilePhotoOptions: CameraOptions;
  // All files to be uploaded on Firebase must have DATA_URL as the destination type.
  // This will return the imageURI which can then be processed and uploaded to Firebase.
  // For the list of cameraOptions, please refer to: https://github.com/apache/cordova-plugin-camera#module_camera.CameraOptions

  constructor(public data: DataProvider, public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider, public camera: Camera, public app: App) {
    console.log("Initializing Image Provider");
    this.profilePhotoOptions = {
      quality: 50,
      targetWidth: 384,
      targetHeight: 384,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };
  }

  // Function to convert dataURI to Blob needed by Firebase
  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }

  // Generate a random filename of length for the image to be uploaded
  generateFilename() {
    var length = 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".jpg";
  }
  // Set ProfilePhoto given the user and the cameraSourceType.
  // This function processes the imageURI returned and uploads the file on Firebase,
  // Finally the user data on the database is updated.
  setProduct1(today, sourceType) {
    this.profilePhotoOptions.sourceType = sourceType;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.profilePhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      let metadata = {
        'contentType': imgBlob.type
      };
      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('products/' + today + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
        // Delete previous profile photo on Storage if it exists.
        this.deleteImageFile(today.img);
        // URL of the uploaded image!
        let url = snapshot.metadata.downloadURLs[0];
        let product = {
          picture1: today.name,
          photoURL: url
        };
        // Update Firebase User.
        this.data.setProduct(today)
          .set((success) => {
            // Update User Data on Database.
            this.angularfireDatabase.object('/products/' + today +'/').set({
              picture1: url
            }).then((success) => {
              this.loadingProvider.hide();
            }).catch((error) => {
              this.loadingProvider.hide();
            });
          })
          .catch((error) => {
            this.loadingProvider.hide();
          });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    }).catch((error) => {
      this.loadingProvider.hide();
    });
  }
  setProduct2(today, sourceType) {
    this.profilePhotoOptions.sourceType = sourceType;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.profilePhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      let metadata = {
        'contentType': imgBlob.type
      };
      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('products/' + today + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
        // Delete previous profile photo on Storage if it exists.
        this.deleteImageFile(today.img);
        // URL of the uploaded image!
        let url = snapshot.metadata.downloadURLs[1];
        let product = {
          picture2: today.name,
          photoURL: url
        };
        // Update Firebase User.
        this.data.setProduct(today)
          .set((success) => {
            // Update User Data on Database.
            this.angularfireDatabase.object('/products/' + today).set({
              picture2: url
            }).then((success) => {
              this.loadingProvider.hide();
            }).catch((error) => {
              this.loadingProvider.hide();
            });
          })
          .catch((error) => {
            this.loadingProvider.hide();
          });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    }).catch((error) => {
      this.loadingProvider.hide();
    });
  }

  //Delete the image given the url.
  deleteImageFile(path) {
    var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + firebase.auth().currentUser.uid + '/' + fileName).delete().then(() => { }).catch((error) => { });
  }

  //Delete the user.img given the user.
  deleteUserImageFile(user) {
    var fileName = user.img.substring(user.img.lastIndexOf('%2F') + 3, user.img.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + user.userId + '/' + fileName).delete().then(() => { }).catch((error) => { });
  }
}
