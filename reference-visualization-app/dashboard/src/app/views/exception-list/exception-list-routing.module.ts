import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExceptionListComponent } from './exception-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExceptionListComponent,
    children: [
      {
        path: 'dashboard',
        component: ExceptionListComponent
      },
      {
        path: '',
        redirectTo: '/exception/dashboard',
        pathMatch: 'full'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionListRoutingModule { }
