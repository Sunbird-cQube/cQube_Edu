import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from "highcharts/highstock";
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
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
  
  constructor(private readonly _activatedRoute: ActivatedRoute, private readonly _commonService: CommonService) { 
    this.getData(this.filters);
  }

  ngOnInit(): void {
  }

  getData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nishtha',
      reportName: 'programStatus',
      reportType: 'multiBarChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.filters = res.result.filters;

      this.options = {
        chart: {
          events: {
            load: function(this: any) {
              let categoryHeight = 20;
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
        yAxis: {
          opposite: true
        },
        series: [{
          type: 'bar',
          name: 'Total Enrollments',
          data: result.map((record: any) => record['Total Enrollments'])
        }, {
          type: 'bar',
          name: 'Total Certifications',
          data: result.map((record: any) => record['Total Certifications'])
        }]
      };
      
      this.stateWiseEnrollmentData = result;
    });
  }

  filtersUpdated(filters: any): void {
    this.getData(filters);
  }

}
