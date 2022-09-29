import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';

import { QRCoverageAcrossStatesComponent } from './pages/qr-coverage-across-states/qr-coverage-across-states.component';
import { TotalPlaysPerCapitaComponent } from './pages/total-plays-per-capita/total-plays-per-capita.component';
import { TotalLearningSessionsComponent } from './pages/total-learning-sessions/total-learning-sessions.component';
import { DigitalLearningComponent } from './digital-learning.component';
import { DigitalLearningRoutingModule } from './digital-learning-routing.module';
import { DigitalLearningCoverageComponent } from './pages/digital-learning-coverage/digital-learning-coverage.component';
import { DigitalLearningProgramComponent } from './pages/digital-learning-program/digital-learning-program.component';
import { DataService } from 'src/app/core/services/data.service';
import { EntryStatusComponent } from './pages/entry-status/entry-status.component';

@NgModule({
  declarations: [
    DigitalLearningComponent,
    DigitalLearningProgramComponent,
    DigitalLearningCoverageComponent,
    QRCoverageAcrossStatesComponent,
    TotalPlaysPerCapitaComponent,
    TotalLearningSessionsComponent,
    EntryStatusComponent
  ],
  imports: [
    CommonModule,
    DigitalLearningRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class DigitalLearningModule { }
