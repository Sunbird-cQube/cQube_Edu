import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoCoreModule } from './transloco/transloco.module';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterComponent } from './components/footer/footer.component';

const IMPORTS: any[] = [
  FontAwesomeModule
];

const DECLARATIONS = [
  LayoutComponent,
  HeaderComponent,
  SideNavComponent
];

@NgModule({
  declarations: [
    DECLARATIONS,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoCoreModule,
    NgxSpinnerModule,
    MatTooltipModule,
    IMPORTS
  ],
  exports: [
    IMPORTS,
    DECLARATIONS
  ]
})
export class CoreModule { }
