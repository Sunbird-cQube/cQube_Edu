import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { StudentAttendanceComponent } from './pages/student-attendance/student-attendance.component';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { TeacherAttendanceComponent } from './pages/teacher-attendance/teacher-attendance.component';
import { SatTrendsReportComponent } from './pages/sat-trends-report/sat-trends-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentAttendanceNewComponent } from './pages/student-attendance-new/student-attendance-new.component';
import { StudentAttendanceMapComponent } from './pages/student-attendance-map/student-attendance-map.component';
import { StudentAttendanceBarComponent } from './pages/student-attendance-bar/student-attendance-bar.component';
import { DashletModule} from '@project-sunbird/sb-dashlet-v14';
import { DataService } from 'src/app/core/services/data.service';


@NgModule({
  declarations: [
    AttendanceComponent,
    StudentAttendanceComponent,
    TeacherAttendanceComponent,
    SatTrendsReportComponent,
    StudentAttendanceNewComponent,
    StudentAttendanceMapComponent,
    StudentAttendanceBarComponent
  ],
  imports: [
    DashletModule.forRoot({
      dataService: DataService
    }),
    SharedModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    CommonModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
