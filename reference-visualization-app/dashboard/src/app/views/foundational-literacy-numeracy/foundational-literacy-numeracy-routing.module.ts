import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundationalLiteracyNumeracyComponent } from './foundational-literacy-numeracy.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: FoundationalLiteracyNumeracyComponent,
    children: [
        {
            path: 'dashboard',
            component: FoundationalLiteracyNumeracyComponent
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
export class FoundationalLiteracyNumeracyRoutingModule { }
