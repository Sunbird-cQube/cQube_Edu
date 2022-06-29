import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { NishthaRoutingModule } from './nishtha-routing.module';
import { NishthaComponent } from './nishtha.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NishthaProgramDetailComponent } from './pages/nishtha-program-detail/nishtha-program-detail.component';

@NgModule({
  declarations: [
    NishthaComponent,
    DashboardComponent,
    NishthaProgramDetailComponent
  ],
  imports: [
    CommonModule,
    NishthaRoutingModule,
    SharedModule
  ]
})
export class NishthaModule { }
