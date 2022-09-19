import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolInfrastructureComponent } from './school-infrastructure.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolInfrastructureComponent,
    children: [
        {
            path: 'dashboard',
            component: SchoolInfrastructureComponent
        },
        {
            path: '',
            redirectTo: '/infra/dashboard',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolInfrastructureRoutingModule { }
