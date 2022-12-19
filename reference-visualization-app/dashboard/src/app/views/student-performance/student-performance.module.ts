import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPerformanceRoutingModule } from './student-performance-routing.module';
import { StudentPerformanceComponent } from './student-performance.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { SatMapComponent } from './pages/sat-map/sat-map.component';
import { PatMapComponent } from './pages/pat-map/pat-map.component';
import { PatHeatmapComponent } from './pages/pat-heatmap/pat-heatmap.component';
import { SatHeatmapComponent } from './pages/sat-heatmap/sat-heatmap.component';
import { PatLoComponent } from './pages/pat-lo/pat-lo.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StudentPerformanceComponent,
    SatMapComponent,
    PatMapComponent,
    PatHeatmapComponent,
    SatHeatmapComponent,
    PatLoComponent
  ],
  imports: [
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    SharedModule,
    CommonModule,
    StudentPerformanceRoutingModule,
    NgbModule
  ]
})
export class StudentPerformanceModule { }
