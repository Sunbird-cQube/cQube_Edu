import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { MicroImprovementRoutingModule } from './micro-improvement-routing.module';
import { MicroImprovementComponent } from './micro-improvement.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    MicroImprovementComponent
  ],
  imports: [
    CommonModule,
    MicroImprovementRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule

  ]
})
export class MicroImprovementModule { }
