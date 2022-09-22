import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CqubeLibraryModule } from 'cqube-library';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';

import { TeacherTrainingRoutingModule } from './teacher-training-routing.module';
import { TeacherTrainingComponent } from './teacher-training.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NishthaProgramDetailComponent } from './pages/nishtha-program-detail/nishtha-program-detail.component';
import { NisithaBarComponent } from './pages/nisitha-bar/nisitha-bar.component';
import { NishithaTableComponent } from './pages/nishitha-table/nishitha-table.component';
import { NisithaStackedBarComponent } from './pages/nisitha-stacked-bar/nisitha-stacked-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TotalCoursesTableComponent } from './pages/total-courses-table/total-courses-table.component';
import { ProgramWiseImplementationComponent } from './pages/program-wise-implementation/program-wise-implementation.component';
import { DataService } from 'src/app/core/services/data.service';

@NgModule({
  declarations: [
    TeacherTrainingComponent,
    DashboardComponent,
    NishthaProgramDetailComponent,
    NisithaBarComponent,
    NishithaTableComponent,
    NisithaStackedBarComponent,
    TotalCoursesTableComponent,
    ProgramWiseImplementationComponent,
  ],
  imports: [
    CommonModule,
    TeacherTrainingRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule,
    NgxSpinnerModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ],
})
export class TeacherTrainingModule {}
