import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationOfficialRoutingModule } from './education-official-routing.module';
import { EducationOfficialComponent } from './education-official.component';

import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { EduOfficialReportComponent } from './page/edu-official-report/edu-official-report.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet-v14';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    EducationOfficialComponent,
    EduOfficialReportComponent
  ],
  imports: [
    CommonModule,
    EducationOfficialRoutingModule,
    MatButtonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CqubeLibraryModule,
    SharedModule,
    MatTabsModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class EducationOfficialModule { }
