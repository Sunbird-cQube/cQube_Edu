import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MultiBarChartComponent } from './components/charts/multi-bar-chart/multi-bar-chart.component';
import { DashboardCardComponent } from './components/cards/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { MetricCardComponent } from './components/cards/metric-card/metric-card.component';
import { MapMyIndiaComponent } from './components/maps/map-my-india/map-my-india.component';
import { TableHeatMapDirective, TableHeatMapCellDirective, TableHeatMapColumnDirective } from './directives/table-heat-map/table-heat-map.directive';
import { MaterialHeatChartTableComponent } from './components/tables/material-heat-chart-table/material-heat-chart-table.component';
import { GaugeChartComponent } from './components/charts/gauge-chart/gauge-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LeafletMapComponent } from './components/maps/leaflet-map/leaflet-map.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { MaterialButtonGroupComponent } from './components/buttons/material-button-group/material-button-group.component';
import { LevelNMetricFilterPanelComponent } from './components/level-n-metric-filter-panel/level-n-metric-filter-panel.component';
import { FullScreenDirective } from './directives/full-screen.directive';

const IMPORTS: any[] = [
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  NgSelectModule,
  FormsModule,
  TranslocoModule,
  NgxSpinnerModule,
  MatButtonModule,
  MatPaginatorModule
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
  FilterPanelComponent,
  StackedBarComponent,
  PieChartComponent,
  LeafletMapComponent,
  BarChartComponent,
  MaterialButtonGroupComponent,
  LevelNMetricFilterPanelComponent,
  FullScreenDirective
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
