import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { ImprovementProgramRoutingModule } from './improvement-program-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImprovementProgramComponent } from './improvement-program.component';


@NgModule({
  declarations: [
    ImprovementProgramComponent
  ],
  imports: [
    CommonModule,
    ImprovementProgramRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule,
    NgxSpinnerModule
  ]
})
export class MicroImprovementModule { }
