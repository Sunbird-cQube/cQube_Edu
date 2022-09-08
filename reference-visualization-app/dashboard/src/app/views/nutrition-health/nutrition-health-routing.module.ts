import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionHealthComponent } from './nutrition-health.component';


const routes: Routes = [{
    path: '',
    component: NutritionHealthComponent,
    children: [
        {
            path: 'dashboard',
            component: NutritionHealthComponent
        },
        {
            path: '',
            redirectTo: '/poshan/dashboard',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutritionHealthRoutingModule { }
