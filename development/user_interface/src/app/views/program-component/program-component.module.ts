import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ProgramComponentRoutingModule } from './program-component-routing.module';
import { ProgramComponentComponent } from './program-component.component';


@NgModule({
  declarations: [
    ProgramComponentComponent
  ],
  imports: [
    CommonModule,
    ProgramComponentRoutingModule,
    SharedModule,
    CqubeLibraryModule,
    MatTabsModule,
    NgxSpinnerModule
  ]
})
export class ProgramComponentModule { }
