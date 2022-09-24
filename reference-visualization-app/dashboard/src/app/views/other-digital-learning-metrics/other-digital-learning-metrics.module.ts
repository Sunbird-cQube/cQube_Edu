import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';
import { SharedModule } from 'src/app/shared/shared.module';

import { OtherDigitalLearningMetricsRoutingModule } from './other-digital-learning-metrics-routing.module';
import { OtherDigitalLearningMetricsComponent } from './other-digital-learning-metrics.component';
import { DataService } from 'src/app/core/services/data.service';
import { ContentUsagePieChartComponent } from './pages/content-usage-pie-chart/content-usage-pie-chart.component';

@NgModule({
  declarations: [
    OtherDigitalLearningMetricsComponent,
    ContentUsagePieChartComponent
  ],
  imports: [
    CommonModule,
    OtherDigitalLearningMetricsRoutingModule,
    FormsModule,
    MatButtonModule,
    NgSelectModule,
    ReactiveFormsModule,
    CqubeLibraryModule,
    MatTabsModule,
    DashletModule.forRoot({
      dataService: DataService
    }),
    SharedModule
  ]
})
export class OtherDigitalLearningMetricsModule { }
