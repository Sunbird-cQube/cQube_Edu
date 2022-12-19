import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { CoursesBarChartComponent } from './pages/courses-bar-chart/courses-bar-chart.component';
import { DataService } from 'src/app/core/services/data.service';
import { AverageTimeSpendBarComponent } from './pages/average-time-spend-bar/average-time-spend-bar.component';
import { UsageByCourseContentComponent } from './pages/usage-by-course-content/usage-by-course-content.component';
import { CourseProgressComponent } from './pages/course-progress/course-progress.component';
import { UserProgressComponent } from './pages/user-progress/user-progress.component';
import { GpsOfLearningComponent } from './pages/gps-of-learning/gps-of-learning.component';
import { UserOnboardingComponent } from './pages/user-onboarding/user-onboarding.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesBarChartComponent,
    AverageTimeSpendBarComponent,
    UsageByCourseContentComponent,
    CourseProgressComponent,
    UserProgressComponent,
    GpsOfLearningComponent,
    UserOnboardingComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    MatButtonModule,
    NgSelectModule,
    ReactiveFormsModule,
    CqubeLibraryModule,
    SharedModule,
    NgbModule,
    MatTabsModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class CoursesModule { }
