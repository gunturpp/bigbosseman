import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeadminPage } from './homeadmin';

@NgModule({
  declarations: [
    HomeadminPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeadminPage),
  ],
})
export class HomeadminPageModule {}
