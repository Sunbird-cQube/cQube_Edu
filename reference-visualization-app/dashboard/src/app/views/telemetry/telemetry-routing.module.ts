import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelemetryComponent } from './telemetry.component';

const routes: Routes = [
  {
    path: '',
    component: TelemetryComponent,
    children: [
        {
            path: 'dashboard',
            component: TelemetryComponent
        },
        {
            path: '',
            redirectTo: '/stperformance/dashboard',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelemetryRoutingModule { }
