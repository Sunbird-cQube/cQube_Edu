import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NishthaComponent } from './nishtha.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NishthaProgramDetailComponent } from './pages/nishtha-program-detail/nishtha-program-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NishthaComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail/:version',
        component: NishthaProgramDetailComponent
      },
      {
        path: '',
        redirectTo: '/nishtha/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NishthaRoutingModule { }
