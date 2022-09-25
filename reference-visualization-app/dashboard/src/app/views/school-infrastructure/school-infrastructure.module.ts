import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolInfrastructureRoutingModule } from './school-infrastructure-routing.module';
import { SchoolInfrastructureComponent } from './school-infrastructure.component';
import { InfraMapComponent } from './pages/infra-map/infra-map.component';

import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { UdiseReportComponent } from './pages/udise-report/udise-report.component';
import { InfraCompositeComponent } from './pages/infra-composite/infra-composite.component';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';
import { DataService } from 'src/app/core/services/data.service';


@NgModule({
  declarations: [
    SchoolInfrastructureComponent,
    InfraMapComponent,
    UdiseReportComponent,
    InfraCompositeComponent
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    NgSelectModule,
    ReactiveFormsModule,
    CommonModule,
    SchoolInfrastructureRoutingModule,
    CqubeLibraryModule,
    MatTabsModule,
    DashletModule.forRoot({
      dataService: DataService
    })
  ]
})
export class SchoolInfrastructureModule { }
