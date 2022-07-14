import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CqubeLibraryModule } from 'cqube-library';

import { NishthaRoutingModule } from './nishtha-routing.module';
import { NishthaComponent } from './nishtha.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NishthaProgramDetailComponent } from './pages/nishtha-program-detail/nishtha-program-detail.component';
import { NisithaBarComponent } from './pages/nisitha-bar/nisitha-bar.component';
import { NishithaTableComponent } from './pages/nishitha-table/nishitha-table.component';
import { NisithaStackedBarComponent } from './pages/nisitha-stacked-bar/nisitha-stacked-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    NishthaComponent,
    DashboardComponent,
    NishthaProgramDetailComponent,
    NisithaBarComponent,
    NishithaTableComponent,
    NisithaStackedBarComponent
  ],
  imports: [
    CommonModule,
    NishthaRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule,
    NgxSpinnerModule
  ]
})
export class NishthaModule { }
