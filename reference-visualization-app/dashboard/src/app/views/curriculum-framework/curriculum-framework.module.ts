import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { CurriculumFrameworkRoutingModule } from './curriculum-framework-routing.module';
import { CurriculumFrameworkComponent } from './curriculum-framework.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    CurriculumFrameworkComponent
  ],
  imports: [
    CommonModule,
    CurriculumFrameworkRoutingModule,
    SharedModule,
    CqubeLibraryModule,
    MatTabsModule,
    NgxSpinnerModule
  ]
})
export class CurriculumFrameworkModule { }
