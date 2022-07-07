import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NasProgramComponent } from './pages/nas-program/nas-program.component';
import { NasRoutingModule } from './nas-routing.module';
import { NasComponent } from './nas.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        DashboardComponent,
        NasProgramComponent,
        NasComponent,
    ],
    imports: [
        CommonModule,
        NasRoutingModule,
        MatTabsModule,
        SharedModule,
        CqubeLibraryModule
    ]
})
export class NasModule { }
