import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumFrameworkComponent } from './curriculum-framework.component';


const routes: Routes = [
  {
    path: '',
    component: CurriculumFrameworkComponent,
    children: [
      {
        path: 'dashboard',
        component: CurriculumFrameworkComponent
      },
      {
        path: '',
        redirectTo: '/ncf/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumFrameworkRoutingModule { }
