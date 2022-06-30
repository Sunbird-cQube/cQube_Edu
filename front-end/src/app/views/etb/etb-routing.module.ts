import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtbComponent } from './etb.component';
import { EtbCoverageComponent } from './pages/etb-coverage/etb-coverage.component';
import { EtbProgramComponent } from './pages/etb-program/etb-program.component';

const routes: Routes = [
  {
    path:'',
    component: EtbComponent,
    children: [
      {
        path: 'etb',
        component: EtbProgramComponent
      },
      {
        path: 'etb/coverage',
        component: EtbCoverageComponent
      },
      {
        path: '',
        redirectTo: 'etb',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtbRoutingModule { }
