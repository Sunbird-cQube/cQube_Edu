import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';



import { NutritionHealthRoutingModule } from './nutrition-health-routing.module';
import { NutritionHealthComponent } from './nutrition-health.component';
import { CqubeLibraryModule } from 'cqube-library';


@NgModule({
  declarations: [
    NutritionHealthComponent
  ],
  imports: [
    CommonModule,
    NutritionHealthRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule
  ]
})
export class NutritionHealthModule { }
