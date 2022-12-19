import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolEducationComponent } from './school-education.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolEducationComponent,
    children: [
        {
            path: 'dashboard',
            component: SchoolEducationComponent
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolEducationRoutingModule { }
