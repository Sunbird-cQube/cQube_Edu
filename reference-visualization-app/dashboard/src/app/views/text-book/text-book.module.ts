import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextBookRoutingModule } from './text-book-routing.module';
import { TextBookComponent } from './text-book.component';


import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MapReportComponent } from './pages/map-report/map-report.component';
import { LoTableComponent } from './pages/lo-table/lo-table.component';

@NgModule({
  declarations: [
    TextBookComponent,
    MapReportComponent,
    LoTableComponent
  ],
  imports: [
    CommonModule,
    TextBookRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    
  ]
})
export class TextBookModule { }
