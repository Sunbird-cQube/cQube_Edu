import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';

import { QuizComponent } from './quiz.component';
import { StateWiseParticipationComponent } from './pages/state-wise-participation/state-wise-participation.component';
import { StatesStartedTableComponent } from './pages/states-started-table/states-started-table.component';
import { QuizRoutingModule } from './quiz-routing.module';


@NgModule({
  declarations: [
    QuizComponent,
    StateWiseParticipationComponent,
    StatesStartedTableComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    CqubeLibraryModule,
    MatTabsModule
  ]
})
export class QuizModule { }
