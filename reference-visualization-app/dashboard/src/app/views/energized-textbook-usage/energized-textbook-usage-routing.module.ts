import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnergizedTextbookUsageComponent } from './energized-textbook-usage.component';

const routes: Routes = [
  {
    path: '',
    component: EnergizedTextbookUsageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergizedTextbookUsageRoutingModule { }
