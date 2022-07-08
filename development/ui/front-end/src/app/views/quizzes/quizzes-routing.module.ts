import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';

const routes: Routes = [
  {
    path: '',
    component: QuizzesComponent,
    children: [
        {
            path: 'dashboard',
            component: QuizzesComponent
        },
        {
            path: '',
            redirectTo: '/quizzes/dashboard',
            pathMatch: 'full'
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
