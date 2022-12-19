import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPerformanceComponent } from './student-performance.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPerformanceComponent,
    children: [
        {
            path: 'dashboard',
            component: StudentPerformanceComponent
        },
        {
            path: '',
            redirectTo: '/stperformance/dashboard',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPerformanceRoutingModule { }
