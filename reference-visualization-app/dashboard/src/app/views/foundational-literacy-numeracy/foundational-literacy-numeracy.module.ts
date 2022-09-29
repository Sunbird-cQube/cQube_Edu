import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DevelopmentGoalBarComponent } from './pages/development-goal-bar/development-goal-bar.component';
import { GradeWiseBarAndPieComponent } from './pages/grade-wise-bar-and-pie/grade-wise-bar-and-pie.component';
import { GardeWiseResourceComponent } from './pages/garde-wise-resource/garde-wise-resource.component';
import { CqubeLibraryModule } from 'cqube-library';
import { FoundationalLiteracyNumeracyComponent } from './foundational-literacy-numeracy.component';
import { FoundationalLiteracyNumeracyRoutingModule } from './foundational-literacy-numeracy-routing.module';
import { FoundationalLiteracyBarPieComponent } from './pages/foundational-literacy-bar-pie/foundational-literacy-bar-pie.component';
import { DataService } from 'src/app/core/services/data.service';
import { EntryStatusComponent } from './pages/entry-status/entry-status.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FoundationalLiteracyNumeracyComponent,
    FoundationalLiteracyBarPieComponent,
    DevelopmentGoalBarComponent,
    GradeWiseBarAndPieComponent,
    GardeWiseResourceComponent,
    EntryStatusComponent
  ],
  imports: [
    CommonModule,
    FoundationalLiteracyNumeracyRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class FoundationalLiteracyNumeracyModule { }
