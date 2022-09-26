import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicModuleRoutingModule } from './dynamic-module-routing.module';
import { DynamicModuleComponent } from './dynamic-module.component';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MapReportComponent } from './pages/map-report/map-report.component';
import { LoReportComponent } from './pages/lo-report/lo-report.component';


@NgModule({
  declarations: [
    DynamicModuleComponent,
    MapReportComponent,
    LoReportComponent
  ],
  imports: [
    CommonModule,
    DynamicModuleRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
  ]
})
export class DynamicModuleModule { }
