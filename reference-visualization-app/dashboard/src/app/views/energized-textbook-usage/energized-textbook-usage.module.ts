import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';

import { EnergizedTextbookUsageRoutingModule } from './energized-textbook-usage-routing.module';
import { EnergizedTextbookUsageComponent } from './energized-textbook-usage.component';
import { UsageByTextBookComponent } from './usage-by-text-book/usage-by-text-book.component';
import { DataService } from 'src/app/core/services/data.service';
import { TotalContentPlayOverYearsComponent } from './total-content-play-over-years/total-content-play-over-years.component';

import { UsageByTextbookContentComponent } from './pages/usage-by-textbook-content/usage-by-textbook-content.component';
import { GpsOfLearningComponent } from './pages/gps-of-learning/gps-of-learning.component';
import { UsagePerCapitaComponent } from './pages/usage-per-capita/usage-per-capita.component';
import { HeartbeatOfTheNationLearningComponent } from './pages/heartbeat-of-the-nation-learning/heartbeat-of-the-nation-learning.component';

@NgModule({
  declarations: [
    EnergizedTextbookUsageComponent,
    UsageByTextBookComponent,
    TotalContentPlayOverYearsComponent,
    UsageByTextbookContentComponent,
    GpsOfLearningComponent,
    UsagePerCapitaComponent,
    HeartbeatOfTheNationLearningComponent
  ],
  imports: [
    CommonModule,
    EnergizedTextbookUsageRoutingModule,
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
export class EnergizedTextbookUsageModule { }
