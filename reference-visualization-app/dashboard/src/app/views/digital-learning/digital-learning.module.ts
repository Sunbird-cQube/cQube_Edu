import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';


import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';

import { QRCoverageAcrossStatesComponent } from './pages/qr-coverage-across-states/qr-coverage-across-states.component';
import { TotalPlaysPerCapitaComponent } from './pages/total-plays-per-capita/total-plays-per-capita.component';
import { TotalLearningSessionsComponent } from './pages/total-learning-sessions/total-learning-sessions.component';
import { DigitalLearningComponent } from './digital-learning.component';
import { DigitalLearningRoutingModule } from './digital-learning-routing.module';
import { DigitalLearningCoverageComponent } from './pages/digital-learning-coverage/digital-learning-coverage.component';
import { DigitalLearningProgramComponent } from './pages/digital-learning-program/digital-learning-program.component';

@NgModule({
  declarations: [
    DigitalLearningComponent,
    DigitalLearningProgramComponent,
    DigitalLearningCoverageComponent,
    QRCoverageAcrossStatesComponent,
    TotalPlaysPerCapitaComponent,
    TotalLearningSessionsComponent
  ],
  imports: [
    CommonModule,
    DigitalLearningRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule
  ]
})
export class DigitalLearningModule { }
