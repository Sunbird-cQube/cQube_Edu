import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { MultiBarChartComponent } from './components/charts/multi-bar-chart/multi-bar-chart.component';
import { DashboardCardComponent } from './components/cards/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { MetricCardComponent } from './components/cards/metric-card/metric-card.component';
import { MapMyIndiaComponent } from './components/maps/map-my-india/map-my-india.component';
import { TableHeatMapDirective, TableHeatMapCellDirective, TableHeatMapColumnDirective } from './directives/table-heat-map/table-heat-map.directive';
import { MaterialHeatChartTableComponent } from './components/tables/material-heat-chart-table/material-heat-chart-table.component';
import { GaugeChartComponent } from './components/charts/gauge-chart/gauge-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { ChartsModule } from 'ng2-charts';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

const IMPORTS: any[] = [
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  NgSelectModule,
  FormsModule
];

const DECLARATIONS = [
  MultiBarChartComponent,
  DashboardCardComponent,
  MetricCardComponent,
  MaterialHeatChartTableComponent,
  MapMyIndiaComponent,
  TableHeatMapDirective,
  TableHeatMapCellDirective,
  TableHeatMapColumnDirective,
  GaugeChartComponent,
  ScatterChartComponent,
  FilterPanelComponent
];

@NgModule({
  declarations: [
    DECLARATIONS,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    IMPORTS
  ],
  exports: [
    IMPORTS,
    DECLARATIONS
  ]
})
export class SharedModule { }
