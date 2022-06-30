import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiBarChartComponent } from './components/charts/multi-bar-chart/multi-bar-chart.component';
import { DashboardCardComponent } from './components/cards/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { MetricCardComponent } from './components/cards/metric-card/metric-card.component';
import { MaterialTableComponent } from './components/tables/material-table/material-table.component';
import { MapMyIndiaComponent } from './components/maps/map-my-india/map-my-india.component';

const IMPORTS: any[] = [];

const DECLARATIONS = [
  MultiBarChartComponent,
  DashboardCardComponent,
  MetricCardComponent,
  MaterialTableComponent
];

@NgModule({
  declarations: [
    DECLARATIONS,
    MapMyIndiaComponent
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
