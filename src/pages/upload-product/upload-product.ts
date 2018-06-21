import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { LoadingProvider } from "../../providers/loading/loading";
import { ImageProvider } from "../../providers/image/image";
import * as moment from "moment";
import * as firebase from "firebase/app";
import { Camera } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-upload-product",
  templateUrl: "upload-product.html"
})
export class UploadProductPage {
  today = moment(new Date()).format();

  minSize = 35; //mininum ukuran sepatu indonesia
  maxSize = 45; //maximum ukuran sepatu indonesia
  allSize = [];
  shoesName: any;
  category: any;
  price: any;
  grade: any;
  sizeStatus = [];
  stock = [];
  checkSize = [];
  checkStock = [];
  user: any;
  private alert;

  constructor(
    public loadingProvider: LoadingProvider,
    public data: DataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public imageProvider: ImageProvider,
    public camera: Camera
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadProductPage");
    for (var i = this.minSize; i <= this.maxSize; i++) {
      this.sizeStatus[i] = false;
      this.stock[i] = 1;
      this.allSize[i] = this.minSize;
      this.minSize++;
    }

    // this.data.getCurrentUser().subscribe((user) => {
    //   this.loadingProvider.hide();
    //   this.user = user;
    //   console.log("usernya",this.user);

    // });
  }
  checkboxFunction(status, i) {
    console.log("status: ", status + "[" + i + "]");
    if (status) {
      this.checkSize[i] = this.allSize[i];
      this.checkStock[i] = this.stock[i];
    } else {
      this.checkSize[i] = this.allSize[i];
      this.checkStock[i] = 0;
    }
  }
  uploadPicture2() {
    // Ask if the user wants to take a photo or choose from photo gallery.
    this.alert = this.alertCtrl
      .create({
        title: "Upload Foto 2",
        message:
          "Do you want to take a photo or choose from your photo gallery?",
        buttons: [
          {
            text: "Cancel",
            handler: data => {}
          },
          {
            text: "Choose from Gallery",
            handler: () => {
              // Call imageProvider to process, upload, and update user photo.
              this.imageProvider.setProduct2(
                this.today,
                this.camera.PictureSourceType.PHOTOLIBRARY
              );
            }
          },
          {
            text: "Take Photo",
            handler: () => {
              // Call imageProvider to process, upload, and update user photo.
              this.imageProvider.setProduct2(
                this.today,
                this.camera.PictureSourceType.CAMERA
              );
            }
          }
        ]
      })
      .present();
  }
  uploadPicture3() {
    console.log("lol3");
  }
  goUploadProduct() {
    this.loadingProvider.show();
    this.data
      .setProduct(this.today)
      .set({
        shoesName: this.shoesName,
        category: this.category,
        price: this.price,
        grade: this.grade,
        allsize: [
          {
            size: this.checkSize,
            stock: this.checkStock
          }
        ],
        admin: firebase.auth().currentUser.uid,
        created_at: this.today
      })
      .then(success => {
        this.loadingProvider.hide();
      })
      .catch(err => {
        console.log("upload error : ", err);
        this.loadingProvider.hide();
      });
  }
  uploadPicture1() {
    // Ask if the user wants to take a photo or choose from photo gallery.
    this.alert = this.alertCtrl
      .create({
        title: "Upload Foto 1",
        message:
          "Do you want to take a photo or choose from your photo gallery?",
        buttons: [
          {
            text: "Cancel",
            handler: data => {}
          },
          {
            text: "Choose from Gallery",
            handler: () => {
              // Call imageProvider to process, upload, and update user photo.
              this.imageProvider.setProduct1(
                this.today,
                this.camera.PictureSourceType.PHOTOLIBRARY
              );
            }
          },
          {
            text: "Take Photo",
            handler: () => {
              // Call imageProvider to process, upload, and update user photo.
              this.imageProvider.setProduct1(
                this.today,
                this.camera.PictureSourceType.CAMERA
              );
            }
          }
        ]
      })
      .present();
  }
}
