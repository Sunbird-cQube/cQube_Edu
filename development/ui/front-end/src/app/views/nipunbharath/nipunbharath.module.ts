import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { NipunbharathRoutingModule } from './nipunbharath-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NipunbharathComponent } from './nipunbharath.component';
import { NipunbharathBarPieComponent } from './pages/nipunbharath-bar-pie/nipunbharath-bar-pie.component';
import { DevelopmentGoalBarComponent } from './pages/development-goal-bar/development-goal-bar.component';
import { GradeWiseBarAndPieComponent } from './pages/grade-wise-bar-and-pie/grade-wise-bar-and-pie.component';
import { GardeWiseResourceComponent } from './pages/garde-wise-resource/garde-wise-resource.component';
import { CqubeLibraryModule } from 'cqube-library';


@NgModule({
  declarations: [
    DashboardComponent,
    NipunbharathComponent,
    NipunbharathBarPieComponent,
    DevelopmentGoalBarComponent,
    GradeWiseBarAndPieComponent,
    GardeWiseResourceComponent
  ],
  imports: [
    CommonModule,
    NipunbharathRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule
  ]
})
export class NipunbharathModule { }
