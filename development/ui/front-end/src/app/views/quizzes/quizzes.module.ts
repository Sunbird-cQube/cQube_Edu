import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { StateWiseParticipationComponent } from './pages/state-wise-participation/state-wise-participation.component';
import { StatesStartedTableComponent } from './pages/states-started-table/states-started-table.component';


@NgModule({
  declarations: [
    QuizzesComponent,
    StateWiseParticipationComponent,
    StatesStartedTableComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    SharedModule,
    CqubeLibraryModule,
    MatTabsModule
  ]
})
export class QuizzesModule { }
