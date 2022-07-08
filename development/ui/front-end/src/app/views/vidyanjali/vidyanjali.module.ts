import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VidyanjaliRoutingModule } from './vidyanjali-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VidyanjaliComponent } from './vidyanjali.component';
import { CqubeLibraryModule } from 'cqube-library';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    DashboardComponent,
    VidyanjaliComponent
  ],
  imports: [
    CommonModule,
    VidyanjaliRoutingModule,
    MatTabsModule,
    SharedModule,
    CqubeLibraryModule
  ]
})
export class VidyanjaliModule { }
