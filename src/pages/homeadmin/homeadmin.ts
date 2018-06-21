import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoadingProvider } from '../../providers/loading/loading';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';
import { UploadProductPage } from "../upload-product/upload-product";
import { ProfilePage } from "../profile/profile";

@IonicPage()
@Component({
  selector: "page-homeadmin",
  templateUrl: "homeadmin.html"
})
export class HomeadminPage {
  constructor(public angularfireDatabase: AngularFireDatabase,    public loadingProvider: LoadingProvider,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomeadminPage");
    // Create userData on the database if it doesn't exist yet.
    this.createUserData();
  }
  uploadNewProductPage() {
    this.navCtrl.push(UploadProductPage);
  }
  editProfilePage() {
    this.navCtrl.push(ProfilePage);

  }
  // Create userData on the database if it doesn't exist yet.
  createUserData() {    
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then(account => {
        //console.log(account.val());
        // No database data yet, create user data on database
        if (!account.val()) {
          // this.loadingProvider.show();
          let user = firebase.auth().currentUser;
          console.log("user data", user, "haha");
          // declare
          var userId, name, provider, img, email;
          let providerData = user.providerData[0];
          userId = user.uid;
          // Get name from Firebase user.
          if (user.displayName || providerData.displayName) {
            name = user.displayName;
            name = providerData.displayName;
          } else {
            name = localStorage.getItem("newname");
          }
          // Get provider from Firebase user.
          if (providerData.providerId == "password") {
            provider = "Firebase";
          } else if (providerData.providerId == "facebook.com") {
            provider = "Facebook";
          } else if (providerData.providerId == "google.com") {
            provider = "Google";
          }
          // Get photoURL from Firebase user.
          if (user.photoURL || providerData.photoURL) {
            img = user.photoURL;
            img = providerData.photoURL;
          } else {
            img = "none";
          }
          // Get email from Firebase user.
          email = user.email;
          // Set default description.
          // set default displayName to Firebase
          // Insert data on our database using AngularFire.
          this.angularfireDatabase
            .object("/users/" + userId)
            .set({
              userId: userId,
              name: name,
              role: "admin",
              provider: provider,
              img: img,
              gender: "male",
              email: email,
              phoneNumber: "none",
              created_at: new Date().toString(),
              updated_at: new Date().toString(),
              province: "DKI Jakarta",
              birthdate: "none",
              address: "none"
            })
            .then(() => {
              console.log("success create new profile user")
            });
        }
      });
  }
}
