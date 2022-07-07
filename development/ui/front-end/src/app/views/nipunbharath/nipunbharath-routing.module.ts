import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NipunbharathComponent } from './nipunbharath.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NipunbharathComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: '',
            redirectTo: '/nipunbharath/dashboard',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NipunbharathRoutingModule { }
