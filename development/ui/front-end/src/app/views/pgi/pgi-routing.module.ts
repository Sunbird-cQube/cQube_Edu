import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PGIComponent } from './pgi.component';

const routes: Routes = [
  {
    path: '',
    component: PGIComponent,
    children: [
        {
            path: 'dashboard',
            component: PGIComponent
        },
        {
            path: '',
            redirectTo: '/pgi/dashboard',
            pathMatch: 'full'
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PGIRoutingModule { }
