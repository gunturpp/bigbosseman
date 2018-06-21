import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email:any;
  password:any;
  // for register
  newemail: any;
  newpassword: any;
  newname: any;
  registerStatus: boolean;
  constructor(
    private auth: AuthProvider,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingProvider: LoadingProvider,
  ) {
    this.auth.setNavController(this.navCtrl);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    this.registerStatus = false;
    
  }
  login() {
    this.auth.emailLogin(this.email, this.password);
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Welcome Bigbosseman!",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }
  register() {
    console.log("regis");
    this.registerStatus = true;
  }
  back() {
    this.registerStatus = false;
  }
  registerNow() {
    this.auth.registerUser(this.newname,this.newemail, this.newpassword);
  }
}
