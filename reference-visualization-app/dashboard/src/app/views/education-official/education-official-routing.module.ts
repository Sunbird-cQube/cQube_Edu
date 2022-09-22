import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationOfficialComponent } from './education-official.component';

const routes: Routes = [
  {
    path: '',
    component: EducationOfficialComponent,
    children: [
      {
        path: 'dashboard',
        component: EducationOfficialComponent
      },
      {
        path: '',
        redirectTo: '/education-official/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationOfficialRoutingModule { }
