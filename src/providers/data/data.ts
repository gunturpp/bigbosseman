import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";

@Injectable()
export class DataProvider {
  public items: Observable<any>;
  public Objects: AngularFireObject<any>;


  constructor(public angularfireDatabase: AngularFireDatabase) {
    console.log('Hello DataProvider Provider');
  }
  // Set schedule psg by their userId
  setProduct(today) {
    return this.angularfireDatabase.object("/products/" + today);
  }
  getCurrentUser() {
    this.items = this.angularfireDatabase
      .object("/users/" + firebase.auth().currentUser.uid)
      .valueChanges();
    return this.items;
  }
}
