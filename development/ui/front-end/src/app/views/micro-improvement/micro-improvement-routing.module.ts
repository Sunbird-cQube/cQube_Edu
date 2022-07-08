import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroImprovementComponent } from './micro-improvement.component';

const routes: Routes = [
  {
    path: '',
    component: MicroImprovementComponent,
    children: [
        {
            path: 'dashboard',
            component: MicroImprovementComponent
        },
        {
            path: '',
            redirectTo: '/microimprovement/dashboard',
            pathMatch: 'full'
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicroImprovementRoutingModule { }
