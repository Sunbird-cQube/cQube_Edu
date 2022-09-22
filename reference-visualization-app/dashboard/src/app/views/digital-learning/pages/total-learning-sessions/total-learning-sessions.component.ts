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
  noData: boolean = false;
  filters: any;
  barChartOptions: Highcharts.Options | undefined;
  isReportLoading = false;

  config = {
    labelExpr: 'Location',
    datasets: [
      { dataExpr: 'Total No of Plays (App and Portal)', label: 'Total No of Learning Sessions (App and Portal)' }
    ],
    options: {
      height: '700'
    }
  };
  data;

  constructor(private readonly _commonService: CommonService) {
    this.getTotalLearningSessions(this.filters);
  }

  ngOnInit(): void {
  }

  getTotalLearningSessions(filters: any): void {
    this.isReportLoading = true;
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'digital_learning',
      reportName: 'totalLearningSessions',
      reportType: 'barChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.noData = result.length === 0 ? true : false;
      this.filters = res.result.filters;
      this.config.options.height = (result.length * 15 + 150).toString();
      this.data = { values: result };

      this.isReportLoading = false;

    }, err => {
      this.isReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getTotalLearningSessions(filters);
  }

}
