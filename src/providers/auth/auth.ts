import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { HomeadminPage } from "../../pages/homeadmin/homeadmin";
import { NavController } from "ionic-angular";
import * as firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading/loading';

@Injectable()
export class AuthProvider {
  public navCtrl: NavController;
  constructor(
    private loadingProvider: LoadingProvider,
    private fireAuth: AngularFireAuth,
    public zone: NgZone,
  ) {
    console.log("Hello AuthProvider Provider");
    // Detect changes on the Firebase user and redirects the view depending on the user's status.
    firebase.auth().onAuthStateChanged(user => {
      //console.log("firebase auth : ");
      console.log(JSON.stringify(user));
      if (user) {
        if (true) {
          if (1) {
            //user["emailVerified"]
            //Goto Home Page.
            this.zone.run(() => {
              this.navCtrl.setRoot(HomeadminPage, { animate: false });
            });
            //Since we're using a TabsPage an NgZone is required.
          } else {
            //Goto Verification Page.
            console.log("Go verification");
            // this.navCtrl.setRoot(Login.verificationPage, { animate: false });
          }
        } else {
          //Goto Home Page.
          // this.zone.run(() => {
          //   this.navCtrl.setRoot(HomeadminPage, { animate: false });
          // });
          //Since we're using a TabsPage an NgZone is required.
        }
      }
      //last block
    });
  }
  // Hook this provider up with the navigationController.
  // This is important, so the provider can redirect the app to the views depending
  // on the status of the Firebase user.
  setNavController(navCtrl) {
    this.navCtrl = navCtrl;
  }

  // Login on Firebase given the email and password.
  emailLogin(email, password) {
    this.loadingProvider.show();
    this.fireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log("got data", data);
        this.loadingProvider.hide();
      })
      .catch(error => {
        console.log("got an error", error);
        this.loadingProvider.hide();        
      });
    console.log("SignIn! : ", email);
  }
  registerUser(name, email, password) {
    this.loadingProvider.show();
    localStorage.setItem("newname",name);
    this.fireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log("got data", data);
        this.loadingProvider.hide();        
      })
      .catch(error => {
        console.log("got an error", error);
        this.loadingProvider.hide();        
      });
    console.log("Register done : ", email);
  }
}
