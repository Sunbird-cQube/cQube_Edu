import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './progress.component';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { ProgressCardComponent } from './pages/progress-card/progress-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProgressComponent,
    ProgressCardComponent
  ],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    FormsModule,
    MatButtonModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedModule,
    NgbModule

  ]
})
export class ProgressModule { }
