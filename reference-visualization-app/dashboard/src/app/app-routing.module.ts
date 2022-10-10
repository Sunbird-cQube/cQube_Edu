import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomePageComponent } from './views/home-page/home-page.component';

var routes: Routes = [];

if (environment.config == 'national') {
  routes = [
    // {
    //   path: '',
    //   loadChildren: () => import('./views/authentication/authentication.module').then(module => module.AuthenticationModule)
    // },
    // {
    //   path: '', redirectTo: `home`, pathMatch: 'full'
    // },
    // {
    //   path: 'home', component: HomePageComponent
    // },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('./views/dashboard/dashboard.module').then(
              (module) => module.DashboardModule
            ),
        },
        {
          path: 'nishtha',
          loadChildren: () =>
            import('./views/teacher-training/teacher-training.module').then(
              (module) => module.TeacherTrainingModule
            ),
        },
        {
          path: 'etb',
          loadChildren: () =>
            import('./views/digital-learning/digital-learning.module').then(
              (module) => module.DigitalLearningModule
            ),
        },
        {
          path: 'nas',
          loadChildren: () =>
            import(
              './views/student-learning-survey/student-learning-survey.module'
            ).then((module) => module.StudentLearningSurveyModule),
        },
        {
          path: 'udise',
          loadChildren: () =>
            import('./views/school-registry/school-registry.module').then(
              (module) => module.SchoolRegistryModule
            ),
        },
        {
          path: 'poshan',
          loadChildren: () =>
            import('./views/nutrition-health/nutrition-health.module').then(
              (module) => module.NutritionHealthModule
            ),
        },
        {
          path: 'pgi',
          loadChildren: () =>
            import('./views/school-education/school-education.module').then(
              (module) => module.SchoolEducationModule
            ),
        },
        {
          path: 'nipunbharath',
          loadChildren: () =>
            import(
              './views/foundational-literacy-numeracy/foundational-literacy-numeracy.module'
            ).then((module) => module.FoundationalLiteracyNumeracyModule),
        },
        {
          path: 'vidyanjali',
          loadChildren: () =>
            import('./views/vidyanjali/vidyanjali.module').then(
              (module) => module.VidyanjaliModule
            ),
        },
        {
          path: 'quizzes',
          loadChildren: () =>
            import('./views/quiz/quiz.module').then(
              (module) => module.QuizModule
            ),
        },
        {
          path: 'microimprovement',
          loadChildren: () =>
            import(
              './views/improvement-program/improvement-program.module'
            ).then((module) => module.MicroImprovementModule),
        },
        {
          path: 'ncf',
          loadChildren: () =>
            import(
              './views/curriculum-framework/curriculum-framework.module'
            ).then((module) => module.CurriculumFrameworkModule),
        },
      ],
    },
  ];
} else {
  routes = [
    {
      path: '', redirectTo: `home`, pathMatch: 'full'
    },
    {
      path: 'signin', redirectTo: 'login', pathMatch: 'full',
    },
    {
      path: 'home', component: HomePageComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '',
      component: LayoutComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('./views/dashboard/dashboard.module').then(
              (module) => module.DashboardModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'nishtha',
          loadChildren: () =>
            import('./views/teacher-training/teacher-training.module').then(
              (module) => module.TeacherTrainingModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'etb',
          loadChildren: () =>
            import('./views/digital-learning/digital-learning.module').then(
              (module) => module.DigitalLearningModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'nas',
          loadChildren: () =>
            import(
              './views/student-learning-survey/student-learning-survey.module'
            ).then((module) => module.StudentLearningSurveyModule),
          canLoad: [AuthGuard]
        },
        {
          path: 'poshan',
          loadChildren: () =>
            import('./views/nutrition-health/nutrition-health.module').then(
              (module) => module.NutritionHealthModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'pgi',
          loadChildren: () =>
            import('./views/school-education/school-education.module').then(
              (module) => module.SchoolEducationModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'udise',
          loadChildren: () =>
            import('./views/school-registry/school-registry.module').then(
              (module) => module.SchoolRegistryModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'infra',
          loadChildren: () =>
            import('./views/school-infrastructure/school-infrastructure.module').then(
              (module) => module.SchoolInfrastructureModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'stperformance',
          loadChildren: () =>
            import('./views/student-performance/student-performance.module').then(
              (module) => module.StudentPerformanceModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'education-official',
          loadChildren: () =>
            import('./views/education-official/education-official.module').then(
              (module) => module.EducationOfficialModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'attendance',
          loadChildren: () =>
            import('./views/attendance/attendance.module').then(
              (module) => module.AttendanceModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'courses',
          loadChildren: () =>
            import('./views/courses/courses.module').then(
              (module) => module.CoursesModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'etb-usage',
          loadChildren: () =>
            import('./views/energized-textbook-usage/energized-textbook-usage.module').then(
              (module) => module.EnergizedTextbookUsageModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'exception',
          loadChildren: () =>
            import('./views/exception-list/exception-list.module').then(
              (module) => module.ExceptionListModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'composite',
          loadChildren: () =>
            import('./views/composite/composite.module').then(
              (module) => module.CompositeModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'telemetry',
          loadChildren: () =>
            import('./views/telemetry/telemetry.module').then(
              (module) => module.TelemetryModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'progress-card',
          loadChildren: () =>
            import('./views/progress/progress.module').then(
              (module) => module.ProgressModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: 'other-diksha-metrics',
          loadChildren: () =>
            import('./views/other-digital-learning-metrics/other-digital-learning-metrics.module').then(
              (module) => module.OtherDigitalLearningMetricsModule
            ),
          canLoad: [AuthGuard]
        },
        {
          path: ':id',
          loadChildren: () =>
            import('./views/dynamic-module/dynamic-module.module').then(
              (module) => module.DynamicModuleModule
            ),
          canLoad: [AuthGuard]
        }
      ],
    },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
