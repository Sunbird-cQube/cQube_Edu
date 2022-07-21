import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
        {
            path: 'dashboard',
            component: QuizComponent
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
export class QuizRoutingModule { }
