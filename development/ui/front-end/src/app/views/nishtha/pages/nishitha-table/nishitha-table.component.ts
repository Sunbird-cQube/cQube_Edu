import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from "highcharts/highstock";
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-nishitha-table',
  templateUrl: './nishitha-table.component.html',
  styleUrls: ['./nishitha-table.component.scss']
})
export class NishithaTableComponent implements OnInit {
  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  options: Highcharts.Options | undefined;
  filters: any;
  title: any;
  chartHeight: any;
  
  @Input() lastLevel!: string;

  constructor(private readonly _activatedRoute: ActivatedRoute, private readonly _commonService: CommonService) { }

  ngOnInit(): void {
    this.getData(this.filters);
    if(this.lastLevel === 'district'){
      this.title = 'Total Enrolments and Total Certifications'
    }
    else{
      this.title = 'Total Enrolments and Total Completion'
    }
  }

  getData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nishtha',
      reportName: this.lastLevel === 'district' ? 'stateOrDistrictWiseEnrollments' : 'stateOrCourseWiseEnrollments',
      reportType: 'multiBarChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.filters = res.result.filters;

      let series: any = [];
      if (this.lastLevel === 'district') {
        //result = result.slice(0, 10);
        series = [{
          type: 'bar',
          name: 'Total Certifications',
          color: "rgb(239,243,255)",
          data: result.map((record: any) => record['Total Certifications'])
        }, {
          type: 'bar',
          name: 'Total Enrolments',
          color: "rgb(33,113,181)",
          data: result.map((record: any) => record['Total Enrollments'])
        }];
      } else {
        //result = result.slice(0, 100);
        series = [{
          type: 'bar',
          name: 'Enrolments',
          data: result.map((record: any) => record['Enrollments'])
        }, {
          type: 'bar',
          name: 'Completion',
          data: result.map((record: any) => record['Completion'])
        }];
      }

      this.options = {
        chart: {
          // events: {
          //   load: function(this: any) {
          //     let categoryHeight = 20;
          //     this.update({
          //       chart: {
          //         height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
          //       }
          //     })
          //   }
          // }
        },
        xAxis: {
          categories: result.map((record: any) => {
            return this.lastLevel === 'district' ? record['Location'] : record['Course Name'];
          })
        },
        yAxis: {
          opposite: true
        },
        series: series
      };
      
      this.stateWiseEnrollmentData = result;
    });
  }

  filtersUpdated(filters: any): void {
    this.getData(filters);
  }

}
