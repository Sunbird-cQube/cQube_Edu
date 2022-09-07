import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grade-wise-bar-and-pie',
  templateUrl: './grade-wise-bar-and-pie.component.html',
  styleUrls: ['./grade-wise-bar-and-pie.component.scss']
})
export class GradeWiseBarAndPieComponent implements OnInit {
  filters: any;
  barChartOptions: Highcharts.Options | undefined;
  isReportLoading = false;
  constructor(private readonly _commonService: CommonService) {
    this.getBarData(this.filters);
  }

  ngOnInit(): void {
  }

  getBarData(filters: any): void {
    this.isReportLoading = true;
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'foundation_literacy_numeracy',
      reportName: 'loCoveredByTextbook',
      reportType: 'barChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.filters = res.result.filters;

      this.barChartOptions = {
        chart: {
          events: {
            load: function (this: any) {
              let categoryHeight = 30;
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
            return record['Textbook Name'];
          })
        },
        yAxis: {
          max: 100,
          opposite: true
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
        series: [{
          type: 'bar',
          name: '% LOs covered',
          data: result.map((record: any) => record['% LOs covered'])
        }]
      };
      this.isReportLoading = false;
    }, err => {
      this.isReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getBarData(filters);
  }
}
