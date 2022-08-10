import { Component, HostListener, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { ActivatedRoute } from '@angular/router';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nisitha-stacked-bar',
  templateUrl: './nisitha-stacked-bar.component.html',
  styleUrls: ['./nisitha-stacked-bar.component.scss']
})
export class NisithaStackedBarComponent implements OnInit {
  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  enrollmentTargetChartOptions: Highcharts.Options | undefined;
  certificateTargetChartOptions: Highcharts.Options | undefined;
  filters: any;

  constructor(private readonly _commonService: CommonService) {
    this.getEnrollmentTarget(this.filters);
    this.getCretificateTarget(this.filters);
  }

  ngOnInit(): void {
  }

  getEnrollmentTarget(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nishtha',
      reportName: 'enrollmentAgainstTargets',
      reportType: 'stackedBarChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.filters = res.result.filters;
      this.enrollmentTargetChartOptions = {
        chart: {
          marginTop: 50,
          events: {
            load: function (this: any) {
              let categoryHeight = 15;
              this.update({
                chart: {
                  height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                }
              })
            }
          }
        },
        xAxis: {
          categories: result.map((record: any) => {
            return record['Location'];
          })
        },
        plotOptions: {
          bar: {
              dataLabels: {
                  enabled: false
              }
          }
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          floating: false,
          borderWidth: 0,
          shadow: false,
          reversed: true
        },
        tooltip: {
          shared: true,
          formatter: function(this: any) {
            return `<p style="font-weight: 700">${this.x}</p><br><br>${this.points[0].point.data}`;
          },
          style: {
            opacity: 1,
            backgroundColor: '#fff'
          }
        },
        series: [
          {
            type: 'bar',
            color: "rgb(239,243,255)",
            name: '% Total Target-Enrolment',
            data: result.map((record: any) => {
              return {
                y: Number(Number(100 - record['% Target Achieved- Enrolment']).toFixed(2)),
                data: record.tooltip
              };
            })
          },
          {
          type: 'bar',
          color: "rgb(33,113,181)",
          name: '% Target Achieved-Enrolment',
          data: result.map((record: any) => {
            return record['% Target Achieved- Enrolment'];
          })
          }],
      };
    })
  }
  
  getCretificateTarget(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nishtha',
      reportName: 'certificationAgainstTargets',
      reportType: 'stackedBarChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.certificateTargetChartOptions = {
        chart: {
          marginTop: 50,
          events: {
            load: function (this: any) {
              let categoryHeight = 15;
              this.update({
                chart: {
                  height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                }
              })
            }
          }
        },
        xAxis: {
          categories: result.map((record: any) => {
            return record['Location'];
          })
        },
        plotOptions: {
          bar: {
              dataLabels: {
                  enabled: false
              }
          }
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          floating: false,
          borderWidth: 0,
          shadow: false,
          reversed: true
        },
        tooltip: {
          shared: true,
          formatter: function(this: any) {
            return `<p style="font-weight: 700">${this.x}</p><br><br>${this.points[0].point.data}`;
          },
          style: {
            opacity: 1,
            backgroundColor: '#fff'
          }
        },
        series: [
          {
            type: 'bar',
            color: "rgb(239,243,255)",
            name: '% Total Target-Certificates',
            data: result.map((record: any) => {
              return {
                y: Number(Number(100 - record['% Target Achieved- Certificates']).toFixed(2)),
                data: record.tooltip
              };
            })
          },
          {
          type: 'bar',
          color: "rgb(33,113,181)",
          name: '% Target Achieved-Certificates',
          data: result.map((record: any) => {
            return record['% Target Achieved- Certificates'];
          })
          }
        ]
      };
    })
  }

  filtersUpdated(filters: any): void {
    this.getEnrollmentTarget(filters);
    this.getCretificateTarget(filters);
  }

}