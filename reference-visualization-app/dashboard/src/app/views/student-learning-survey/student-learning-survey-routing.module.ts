import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentLearningSurveyProgramComponent } from './pages/student-learning-survey-program/student-learning-survey-program.component';
import { StudentLearningSurveyComponent } from './student-learning-survey.component';


const routes: Routes = [
    {
        path: '',
        component: StudentLearningSurveyComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'detail',
                component: StudentLearningSurveyProgramComponent
            },
            {
                path: '',
                redirectTo: '/nas/dashboard',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentLearningSurveyRoutingModule { }
