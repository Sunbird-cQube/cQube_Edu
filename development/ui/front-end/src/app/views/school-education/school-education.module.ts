import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PGIRoutingModule } from './pgi-routing.module';
import { SchoolEducationRoutingModule } from './school-education-routing.module';  

import { MatTabsModule } from '@angular/material/tabs';
import { CqubeLibraryModule } from 'cqube-library';
import { SchoolEducationComponent } from './school-education.component';


@NgModule({
  declarations: [
    SchoolEducationComponent
  ],
  imports: [
    CommonModule,
    SchoolEducationRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule
  ]
})
export class SchoolEducationModule { }
