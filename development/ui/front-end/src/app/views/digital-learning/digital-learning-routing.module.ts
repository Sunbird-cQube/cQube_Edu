import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalLearningComponent } from './digital-learning.component';
import { DigitalLearningCoverageComponent } from './pages/digital-learning-coverage/digital-learning-coverage.component';
import { DigitalLearningProgramComponent } from './pages/digital-learning-program/digital-learning-program.component';

const routes: Routes = [
  {
    path:'',
    component: DigitalLearningComponent,
    children: [
      {
        path: 'etb',
        component: DigitalLearningProgramComponent
      },
      {
        path: 'coverage',
        component: DigitalLearningCoverageComponent
      },
      {
        path: '',
        redirectTo: 'etb',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalLearningRoutingModule { }
