import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SchoolRegistryComponent } from './school-registry.component';
import { SchoolRegistryRoutingModule } from './school-registry-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    SchoolRegistryComponent
  ],
  imports: [
    CommonModule,
    SchoolRegistryRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule
  ]
})
export class SchoolRegistryModule { }
