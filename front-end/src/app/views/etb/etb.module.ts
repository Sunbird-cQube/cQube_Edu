import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtbRoutingModule } from './etb-routing.module';
import { EtbComponent } from './etb.component';
import { EtbProgramComponent } from './pages/etb-program/etb-program.component';
import { EtbCoverageComponent } from './pages/etb-coverage/etb-coverage.component';
import { MatTableModule } from '@angular/material/table'  
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    EtbComponent,
    EtbProgramComponent,
    EtbCoverageComponent
  ],
  imports: [
    CommonModule,
    EtbRoutingModule,
    MatTableModule,
    MatSortModule
  ]
})
export class EtbModule { }
