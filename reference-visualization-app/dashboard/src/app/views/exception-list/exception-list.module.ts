import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionListRoutingModule } from './exception-list-routing.module';
import { ExceptionListComponent } from './exception-list.component';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { SatExceptionComponent } from './pages/sat-exception/sat-exception.component';
import { PatExceptionComponent } from './pages/pat-exception/pat-exception.component';
import { StudentAttendanceExceptionComponent } from './pages/student-attendance-exception/student-attendance-exception.component';
import { TeacherAttendanceExceptionComponent } from './pages/teacher-attendance-exception/teacher-attendance-exception.component';

@NgModule({
  declarations: [
    ExceptionListComponent,
    SatExceptionComponent,
    PatExceptionComponent,
    StudentAttendanceExceptionComponent,
    TeacherAttendanceExceptionComponent
  ],
  imports: [
    SharedModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    CommonModule,
    ExceptionListRoutingModule
  ]
})
export class ExceptionListModule { }
