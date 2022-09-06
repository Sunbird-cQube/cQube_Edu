import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SchoolRegistryComponent } from './school-registry.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolRegistryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRegistryRoutingModule { }
