import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolInfrastructureRoutingModule } from './school-infrastructure-routing.module';
import { SchoolInfrastructureComponent } from './school-infrastructure.component';
import { InfraMapComponent } from './pages/infra-map/infra-map.component';

import { CqubeLibraryModule } from 'cqube-library';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SchoolInfrastructureComponent,
    InfraMapComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SchoolInfrastructureRoutingModule,
    CqubeLibraryModule,
    MatTabsModule
  ]
})
export class SchoolInfrastructureModule { }
