import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherTrainingComponent } from './teacher-training.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NishthaProgramDetailComponent } from './pages/nishtha-program-detail/nishtha-program-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherTrainingComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'detail/:version',
        component: NishthaProgramDetailComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherTrainingRoutingModule {}
