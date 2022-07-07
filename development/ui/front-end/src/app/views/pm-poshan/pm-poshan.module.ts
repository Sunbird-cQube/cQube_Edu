import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';



import { PmPoshanRoutingModule } from './pm-poshan-routing.module';
import { PmPoshanComponent } from './pm-poshan.component';


@NgModule({
  declarations: [
    PmPoshanComponent
  ],
  imports: [
    CommonModule,
    PmPoshanRoutingModule,
    SharedModule,
    MatTabsModule
  ]
})
export class PmPoshanModule { }
