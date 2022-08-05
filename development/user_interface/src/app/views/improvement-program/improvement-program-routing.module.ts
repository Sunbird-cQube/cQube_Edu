import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprovementProgramComponent } from './improvement-program.component';


const routes: Routes = [
  {
    path: '',
    component: ImprovementProgramComponent,
    children: [
        {
            path: 'dashboard',
            component: ImprovementProgramComponent
        },
        {
            path: '',
            redirectTo: '/microimprovement/dashboard',
            pathMatch: 'full'
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprovementProgramRoutingModule { }
