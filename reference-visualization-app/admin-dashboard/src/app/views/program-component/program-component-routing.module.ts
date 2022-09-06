import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponentComponent } from './program-component.component';

const routes: Routes = [
  {
      path: ':program',
      component: ProgramComponentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramComponentRoutingModule { }
