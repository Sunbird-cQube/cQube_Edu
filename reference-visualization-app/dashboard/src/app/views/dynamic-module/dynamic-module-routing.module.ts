import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicModuleComponent } from './dynamic-module.component';


const routes: Routes = [
  {
    path: '',
    component: DynamicModuleComponent,
    children: [
      {
        path: 'dashboard',
        component: DynamicModuleComponent,

      },
      {
        path: '',
        redirectTo: 'dynamic',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicModuleRoutingModule { }
