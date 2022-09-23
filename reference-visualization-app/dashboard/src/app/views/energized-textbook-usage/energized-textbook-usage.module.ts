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


@NgModule({
  declarations: [
    EnergizedTextbookUsageComponent,
    UsageByTextBookComponent,
    TotalContentPlayOverYearsComponent
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
