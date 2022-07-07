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
