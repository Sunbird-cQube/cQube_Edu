import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'authentication',
    pathMatch:'full', 
  },
  {
    path:'authentication', 
    loadChildren: () => import('../app/core/components/authentication/authentication.module').then(module => module.AuthenticationModule)
  },
  {
    path: 'layout',
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
        path: '',
        redirectTo: 'layout',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
