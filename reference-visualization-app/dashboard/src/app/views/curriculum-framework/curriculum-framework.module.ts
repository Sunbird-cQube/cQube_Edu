import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { CurriculumFrameworkRoutingModule } from './curriculum-framework-routing.module';
import { CurriculumFrameworkComponent } from './curriculum-framework.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgressStatusComponent } from './pages/progress-status/progress-status.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { DataService } from 'src/app/core/services/data.service';

@NgModule({
  declarations: [
    CurriculumFrameworkComponent,
    ProgressStatusComponent,
    SurveyComponent
  ],
  imports: [
    CommonModule,
    CurriculumFrameworkRoutingModule,
    SharedModule,
    CqubeLibraryModule,
    MatTabsModule,
    NgxSpinnerModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class CurriculumFrameworkModule { }
