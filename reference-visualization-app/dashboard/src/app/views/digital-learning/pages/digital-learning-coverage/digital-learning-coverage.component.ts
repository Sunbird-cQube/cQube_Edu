import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-digital-learning-coverage',
  templateUrl: './digital-learning-coverage.component.html',
  styleUrls: ['./digital-learning-coverage.component.scss']
})
export class DigitalLearningCoverageComponent implements OnInit {
  tableData: any;
  filters: any;
  national = true;
  QRGaugeData: any;
  fileName: string = "Report_data";

  constructor(private readonly _commonService: CommonService) {
    if(environment.config === 'state') {
      this.national = false;
    }

    this.getStateWiseETBCoverageData(this.filters);

    if (!this.national) {
      this.getQRGaugeData(this.filters);
    }
  }

  ngOnInit(): void {
  }

  getStateWiseETBCoverageData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'digital_learning',
      reportName: 'statesEnergizedTextBooks',
      reportType: 'loTable',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.tableData = res.result;
      this.filters = res.result.filters;

      if (this.national) {
        let gaugeChart = res.result.gaugeChart;
        this.QRGaugeData = {
          options: {
            title: gaugeChart.title,
            valueSuffix: gaugeChart.valueSuffix ? ` ${gaugeChart.valueSuffix}` : ''
          },
          percentage: gaugeChart.percentage
        };
      }
    });
  }

  filtersUpdated(filters: any): void {
    this.getStateWiseETBCoverageData(filters);

    if (!this.national) {
      //this.getQRGaugeData(filters);
    }
  }

  getQRGaugeData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'digital_learning',
      reportName: 'statesEnergizedTextBooks',
      reportType: 'gaugeChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.QRGaugeData = res.result.data;
    });
  }
}
