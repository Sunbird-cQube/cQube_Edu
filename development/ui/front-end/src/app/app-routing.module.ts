import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './core/components/layout/layout.component';


var routes: Routes = []

if(environment.config == 'NVSK'){
  routes= [
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
          loadChildren: () => import('./views/etb/etb.module').then(module => module.EtbModule)
        },
        {
          path: 'nas',
          loadChildren: () => import('./views/nas/nas.module').then(module => module.NasModule)
        },
        {
          path: 'udise',
          loadChildren: () => import('./views/udise/udise.module').then(module => module.UdiseModule)
        },
        {
          path: 'poshan',
          loadChildren: () => import('./views/pm-poshan/pm-poshan.module').then(module => module.PmPoshanModule)
        },
        {
          path: 'pgi',
          loadChildren: () => import('./views/pgi/pgi.module').then(module => module.PGIModule)
        },
        {
          path: 'nipunbharath',
          loadChildren: () => import('./views/nipunbharath/nipunbharath.module').then(module => module.NipunbharathModule)
        },
        {
          path: 'vidyanjali',
          loadChildren: () => import('./views/vidyanjali/vidyanjali.module').then(module => module.VidyanjaliModule)
        },
        {
          path: 'quizzes',
          loadChildren: () => import('./views/quizzes/quizzes.module').then(module => module.QuizzesModule)
        },
        {
          path: 'microimprovement',
          loadChildren: () => import('./views/micro-improvement/micro-improvement.module').then(module => module.MicroImprovementModule)
    }
  ]
    }
  ];
}
else{
  routes = [
    {
      path:'', 
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
          loadChildren: () => import('./views/etb/etb.module').then(module => module.EtbModule)
        },
        {
          path: 'nas',
          loadChildren: () => import('./views/nas/nas.module').then(module => module.NasModule)
        },
        {
          path: 'poshan',
          loadChildren: () => import('./views/pm-poshan/pm-poshan.module').then(module => module.PmPoshanModule)
        },
        {
          path: 'pgi',
          loadChildren: () => import('./views/pgi/pgi.module').then(module => module.PGIModule)
        },
        {
          path: 'nipunbharath',
          loadChildren: () => import('./views/nipunbharath/nipunbharath.module').then(module => module.NipunbharathModule)
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
