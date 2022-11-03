import { Component, HostListener, Input, OnInit } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { CommonService } from 'src/app/core/services/common/common.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
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
  fileName: string = "NISHTA_District_wise_Status";
  stateFilterSelected: boolean = true;

  @Input() lastLevel!: string;

  constructor(
    private readonly _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getData(this.filters);
    if (this.lastLevel === 'district') {
      this.title = 'Total Enrolments and Total Certifications';
      this.marginTop = 100;
      this.fileName = "NISHTA_Course_wise_Status";
    } else {
      this.fileName = "NISHTA_Course_wise_Status";
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
      this.stateFilterSelected = true;
      this.filters.forEach((filter: any) => {
        if(filter.name === 'State/UT' && filter.value === 'overall'){
          this.stateFilterSelected = false;
        }
      });

      if (this.lastLevel === 'district') {
        this.config = getChartJSConfig({
          labelExpr: 'Location',
          datasets: getBarDatasetConfig([
            { dataExpr: 'Total Enrollments', label: 'Total Enrolments' },
            { dataExpr: 'Total Certifications', label: 'Total Certifications' }
          ]),
          options: {
            height: (result.length * 15 + 150).toString(),
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  let multistringText = [];                
    
                  if (tooltipItem.datasetIndex === 0) {
                    multistringText.push(`Total Enrolments: ${formatNumberForReport(result[tooltipItem.index]['Total Enrollments'])}`);
                    multistringText.push(`Total Certifications: ${formatNumberForReport(result[tooltipItem.index]['Total Certifications'])}`);
                  }
  
                  return multistringText;
                }
              }
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: this.stateFilterSelected ? 'Districts' : 'States'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Total Enrollment and Certifications'
                }
              }]
            }
          }
        });

        this.data = {
          values: result
        };
      } else {
        this.config = getChartJSConfig({
          labelExpr: 'Course Name',
          datasets: getBarDatasetConfig([
            { dataExpr: 'Enrollments', label: 'Total Enrolments' },
            { dataExpr: 'Certifications', label: 'Total Certifications' }
          ]),
          options: {
            height: (result.length * 15 + 150).toString(),
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  let multistringText = [];                
    
                  if (tooltipItem.datasetIndex === 0) {
                    multistringText.push(`Total Enrolments: ${formatNumberForReport(result[tooltipItem.index]['Enrollments'])}`);
                    multistringText.push(`Total Certifications: ${formatNumberForReport(result[tooltipItem.index]['Certifications'])}`);
                  }
  
                  return multistringText;
                }
              }
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Courses'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Total Enrollment and Certifications'
                }
              }]
            }
          }
        });

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