import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextBookComponent } from './text-book.component';

const routes: Routes = [
  {
    path: '',
    component: TextBookComponent,
    children: [
      {
        path: 'dashboard',
        component: TextBookComponent
      },
      {
        path: '',
        redirectTo: '/textbook-distribution/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextBookRoutingModule { }
