import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PGIRoutingModule } from './pgi-routing.module';
import { PGIComponent } from './pgi.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    PGIComponent
  ],
  imports: [
    CommonModule,
    PGIRoutingModule,
    SharedModule,
    MatTabsModule
  ]
})
export class PGIModule { }
