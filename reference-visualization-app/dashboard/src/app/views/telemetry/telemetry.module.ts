import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelemetryRoutingModule } from './telemetry-routing.module';
import { TelemetryComponent } from './telemetry.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { TelemetryReportComponent } from './pages/telemetry-report/telemetry-report.component';


@NgModule({
  declarations: [
    TelemetryComponent,
    TelemetryReportComponent
  ],
  imports: [
    NgbModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    CommonModule,
    TelemetryRoutingModule
  ]
})
export class TelemetryModule { }
