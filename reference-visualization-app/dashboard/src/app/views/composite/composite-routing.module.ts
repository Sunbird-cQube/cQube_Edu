import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompositeComponent } from './composite.component';

const routes: Routes = [
  {
    path: '',
    component: CompositeComponent,
    children: [
      {
        path: 'dashboard',
        component: CompositeComponent
      },
      {
        path: '',
        redirectTo: '/composite/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompositeRoutingModule { }
