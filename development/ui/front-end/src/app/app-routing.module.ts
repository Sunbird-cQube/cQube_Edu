import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './core/components/layout/layout.component';


var routes: Routes = []

if (environment.config == 'NVSK') {
  routes = [
    {
      path: '',
      loadChildren: () => import('./views/authentication/authentication.module').then(module => module.AuthenticationModule)
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          loadChildren: () => import('./views/dashboard/dashboard.module').then(module => module.DashboardModule)
        },
        {
          path: 'nishtha',
          loadChildren: () => import('./views/nishtha/nishtha.module').then(module => module.NishthaModule)
        },
        {
          path: 'etb',
          loadChildren: () => import('./views/digital-learning/digital-learning.module').then(module => module.DigitalLearningModule)
        },
        {
          path: 'nas',
          loadChildren: () => import('./views/student-learning-survey/student-learning-survey.module').then(module => module.StudentLearningSurveyModule)
        },
        {
          path: 'udise',
          loadChildren: () => import('./views/school-registry/school-registry.module').then(module => module.SchoolRegistryModule)
        },
        {
          path: 'poshan',
          loadChildren: () => import('./views/nutrition-health/nutrition-health.module').then(module => module.NutritionHealthModule)
        },
        {
          path: 'pgi',
          loadChildren: () => import('./views/school-education/school-education.module').then(module => module.SchoolEducationModule)
        },
        {
          path: 'nipunbharath',
          loadChildren: () => import('./views/foundational-literacy-numeracy/foundational-literacy-numeracy.module').then(module =>module.FoundationalLiteracyNumeracyModule)
        },
        {
          path: 'vidyanjali',
          loadChildren: () => import('./views/vidyanjali/vidyanjali.module').then(module => module.VidyanjaliModule)
        },
        {
          path: 'quizzes',
          loadChildren: () => import('./views/quiz/quiz.module').then(module => module.QuizModule)
        },
        {
          path: 'microimprovement',
          loadChildren: () => import('./views/improvement-program/improvement-program.module').then(module => module.MicroImprovementModule)
        },
        {
          path: 'ncf',
          loadChildren: () => import('./views/curriculum-framework/curriculum-framework.module').then(module => module.CurriculumFrameworkModule)
        }
      ]
    }
  ];
}
else {
  routes = [
    {
      path: '',
      loadChildren: () => import('./views/authentication/authentication.module').then(module => module.AuthenticationModule)
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          loadChildren: () => import('./views/dashboard/dashboard.module').then(module => module.DashboardModule)
        },
        {
          path: 'nishtha',
          loadChildren: () => import('./views/nishtha/nishtha.module').then(module => module.NishthaModule)
        },
        {
          path: 'etb',
          loadChildren: () => import('./views/digital-learning/digital-learning.module').then(module => module.DigitalLearningModule)
        },
        {
          path: 'nas',
          loadChildren: () => import('./views/student-learning-survey/student-learning-survey.module').then(module => module.StudentLearningSurveyModule)
        },
        {
          path: 'poshan',
          loadChildren: () => import('./views/nutrition-health/nutrition-health.module').then(module => module.NutritionHealthModule)
        },
        {
          path: 'pgi',
          loadChildren: () => import('./views/school-education/school-education.module').then(module => module.SchoolEducationModule)
        },
        {
          path: 'udise',
          loadChildren: () => import('./views/school-registry/school-registry.module').then(module => module.SchoolRegistryModule)
        }
      ]
    }
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
