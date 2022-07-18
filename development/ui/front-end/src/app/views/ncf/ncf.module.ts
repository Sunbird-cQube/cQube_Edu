import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';
import { NcfRoutingModule } from './ncf-routing.module';
import { NcfComponent } from './ncf.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    NcfComponent
  ],
  imports: [
    CommonModule,
    NcfRoutingModule,
    SharedModule,
    CqubeLibraryModule,
    MatTabsModule,
    NgxSpinnerModule
  ]
})
export class NcfModule { }
