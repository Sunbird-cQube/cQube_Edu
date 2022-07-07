import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NasComponent } from './nas.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NasProgramComponent } from './pages/nas-program/nas-program.component';


const routes: Routes = [
    {
        path: '',
        component: NasComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'detail',
                component: NasProgramComponent
            },
            {
                path: '',
                redirectTo: '/nas/dashboard',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NasRoutingModule { }
