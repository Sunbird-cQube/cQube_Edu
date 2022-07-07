import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';

import { UdiseRoutingModule } from './udise-routing.module';
import { UdiseComponent } from './udise.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    DashboardComponent,
    UdiseComponent
  ],
  imports: [
    CommonModule,
    UdiseRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule
  ]
})
export class UdiseModule { }
