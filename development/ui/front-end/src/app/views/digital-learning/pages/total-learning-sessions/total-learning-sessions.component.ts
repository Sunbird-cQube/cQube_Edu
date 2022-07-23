import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-total-learning-sessions',
  templateUrl: './total-learning-sessions.component.html',
  styleUrls: ['./total-learning-sessions.component.scss']
})
export class TotalLearningSessionsComponent implements OnInit {
  filters: any;
  barChartOptions: Highcharts.Options | undefined;
  isReportLoading = false;

  constructor(private readonly _commonService: CommonService) {
    this.getTotalLearningSessions(this.filters);
  }

  ngOnInit(): void {
  }

  getTotalLearningSessions(filters: any): void {
    this.isReportLoading = true;
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'totalLearningSessions',
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
            load: function(this: any) {
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
            return record['Location'];
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
          name: 'Total No of Learning Sessions (App and Portal)',
          data: result.map((record: any) => record['Total No of Plays (App and Portal)'])
        }]
      };
      this.isReportLoading = false;

    }, err => {
      this.isReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getTotalLearningSessions(filters);
  }

}
