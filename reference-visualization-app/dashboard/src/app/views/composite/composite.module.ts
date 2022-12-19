import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompositeRoutingModule } from './composite-routing.module';

import { CompositeComponent } from './composite.component';
import { CompositeReportComponent } from './pages/composite-report/composite-report.component';
import { DataService } from 'src/app/core/services/data.service';

@NgModule({
  declarations: [
    CompositeComponent,
    CompositeReportComponent
  ],
  imports: [
    CommonModule,
    CompositeRoutingModule,
    SharedModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class CompositeModule { }
