import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

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
    DECLARATIONS
  ],
  imports: [
    CommonModule,
    RouterModule,
    IMPORTS
  ],
  exports: [
    IMPORTS,
    DECLARATIONS
  ]
})
export class CoreModule { }
