import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadProductPage } from './upload-product';

@NgModule({
  declarations: [
    UploadProductPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadProductPage),
  ],
})
export class UploadProductPageModule {}
