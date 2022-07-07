import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmPoshanComponent } from './pm-poshan.component';

const routes: Routes = [{
    path: '',
    component: PmPoshanComponent,
    children: [
        {
            path: 'dashboard',
            component: PmPoshanComponent
        },
        {
            path: '',
            redirectTo: '/poshan/dashboard',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmPoshanRoutingModule { }
