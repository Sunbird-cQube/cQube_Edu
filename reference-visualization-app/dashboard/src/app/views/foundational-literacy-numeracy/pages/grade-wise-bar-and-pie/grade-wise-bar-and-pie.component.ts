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
  config = {
    labelExpr: 'Textbook Name',
    datasets: [
      { dataExpr: '% LOs covered', label: '% LOs covered' }
    ],
    options: {
      height: '700'
    }
  };
  data;

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
      this.config.options.height = (result.length * 15 + 150).toString();
      this.data = {
        values: result
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
