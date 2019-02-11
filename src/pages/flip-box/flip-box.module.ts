import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlipBoxPage } from './flip-box';

@NgModule({
  declarations: [
    FlipBoxPage,
  ],
  imports: [
    IonicPageModule.forChild(FlipBoxPage),
  ],
})
export class FlipBoxPageModule {}
