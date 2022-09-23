import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';

import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { CoursesBarChartComponent } from './pages/courses-bar-chart/courses-bar-chart.component';
import { DataService } from 'src/app/core/services/data.service';
import { AverageTimeSpendBarComponent } from './pages/average-time-spend-bar/average-time-spend-bar.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesBarChartComponent,
    AverageTimeSpendBarComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    MatButtonModule,
    NgSelectModule,
    ReactiveFormsModule,
    CqubeLibraryModule,
    MatTabsModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class CoursesModule { }
