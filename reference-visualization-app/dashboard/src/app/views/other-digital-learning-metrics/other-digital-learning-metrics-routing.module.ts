import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherDigitalLearningMetricsComponent } from './other-digital-learning-metrics.component';

const routes: Routes = [
  {
    path: '',
    component: OtherDigitalLearningMetricsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherDigitalLearningMetricsRoutingModule { }
