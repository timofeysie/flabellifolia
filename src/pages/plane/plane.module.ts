import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanePage } from './plane';

@NgModule({
  declarations: [
    PlanePage,
  ],
  imports: [
    IonicPageModule.forChild(PlanePage),
  ],
})
export class PlanePageModule {}
