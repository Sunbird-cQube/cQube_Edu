import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiBarChartComponent } from './components/charts/multi-bar-chart/multi-bar-chart.component';
import { DashboardCardComponent } from './components/cards/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { MetricCardComponent } from './components/cards/metric-card/metric-card.component';

const IMPORTS: any[] = [];

const DECLARATIONS = [
  MultiBarChartComponent,
  DashboardCardComponent,
  MetricCardComponent
];

@NgModule({
  declarations: [
    DECLARATIONS
  ],
  imports: [
    CommonModule,
    RouterModule,
    IMPORTS
  ],
  exports: [
    IMPORTS,
    DECLARATIONS
  ]
})
export class SharedModule { }
