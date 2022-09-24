import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-nishitha-table',
  templateUrl: './nishitha-table.component.html',
  styleUrls: ['./nishitha-table.component.scss'],
})
export class NishithaTableComponent implements OnInit {
  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  filters: any;
  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;

  @Input() lastLevel!: string;

  constructor(
    private readonly _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getData(this.filters);
    if (this.lastLevel === 'district') {
      this.title = 'Total Enrolments and Total Certifications';
      this.marginTop = 100;
    } else {
      this.title = 'Total Enrolments and Total Certifications';
      this.marginTop = 100;
    }
  }

  getData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'teacher-training',
      reportName:
        this.lastLevel === 'district'
          ? 'stateOrDistrictWiseEnrollments'
          : 'stateOrCourseWiseEnrollments',
      reportType: 'multiBarChart',
      stateCode: environment.stateCode,
      filters,
    };

    this._commonService.getReportData(data).subscribe((res) => {
      let result = res.result.data;
      this.filters = res.result.filters;

      if (this.lastLevel === 'district') {
        this.config = {
          labelExpr: 'Location',
          datasets: [
            { dataExpr: 'Total Enrollments', label: 'Total Enrolments' },
            { dataExpr: 'Total Certifications', label: 'Total Certifications' }
          ],
          options: {
            height: (result.length * 15 + 150).toString(),
            title: {
              text: 'Total Enrolments and Total Certifications'
            }
          }
        }

        this.data = {
          values: result
        };
      } else {
        this.config = {
          labelExpr: 'Course Name',
          datasets: [
            { dataExpr: 'Enrollments', label: 'Total Enrolments' },
            { dataExpr: 'Certifications', label: 'Total Certifications' }
          ],
          options: {
            height: (result.length * 15 + 150).toString(),
            title: {
              text: 'Total Enrolments and Total Certifications'
            }
          }
        }

        this.data = {
          values: result
        };
      }

      this.stateWiseEnrollmentData = result;
    });
  }

  filtersUpdated(filters: any): void {
    this.getData(filters);
  }
}