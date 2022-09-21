import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPerformanceRoutingModule } from './student-performance-routing.module';
import { StudentPerformanceComponent } from './student-performance.component';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { SatMapComponent } from './pages/sat-map/sat-map.component';
import { PatMapComponent } from './pages/pat-map/pat-map.component';


@NgModule({
  declarations: [
    StudentPerformanceComponent,
    SatMapComponent,
    PatMapComponent
  ],
  imports: [
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    CommonModule,
    StudentPerformanceRoutingModule
  ]
})
export class StudentPerformanceModule { }
