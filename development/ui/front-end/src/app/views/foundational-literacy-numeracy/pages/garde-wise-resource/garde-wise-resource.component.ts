import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-garde-wise-resource',
  templateUrl: './garde-wise-resource.component.html',
  styleUrls: ['./garde-wise-resource.component.scss']
})
export class GardeWiseResourceComponent implements OnInit {
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
      dataSourceName: 'nipun_bharat',
      reportName: 'gradeWiseConsumption',
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
              });
            }
          }
        },
        xAxis: {
          categories: result.map((record: any) => {
            return record['Grade'];
          })
        },
        yAxis: {
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
          name: 'Total No of Learning Session (App and Portal)',
          data: result.map((record: any) => record['Total No of Plays (App and Portal)'])
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

  // getBarData() {
  //   this.options = {
  //     xAxis: {
  //       categories: ['Grade 1', 'Grade 2', 'Grade 3', 'Pre School 1', 'Pre School 2', 'Pre School 3', 'Multi Grade']
  //     },
  //     yAxis: {
  //       opposite: true
  //     },
  //     series: [
  //     {
  //       type: 'bar',
  //       color: "#DBADEC",
  //       name: 'Content count',
  //       data: [245, 75, 104, 85,768,104,205]

  //     }
  //      ]
  //   };
  //   }


}
