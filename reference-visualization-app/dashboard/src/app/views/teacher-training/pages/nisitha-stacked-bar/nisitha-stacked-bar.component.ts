import { Component, HostListener, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { ActivatedRoute } from '@angular/router';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nisitha-stacked-bar',
  templateUrl: './nisitha-stacked-bar.component.html',
  styleUrls: ['./nisitha-stacked-bar.component.scss'],
})
export class NisithaStackedBarComponent implements OnInit {
  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  enrollmentTargetChartOptions: Highcharts.Options | undefined;
  certificateTargetChartOptions: Highcharts.Options | undefined;
  filters: any;
  config = {
    labelExpr: 'Location',
    datasets: [
      { dataExpr: '% Target Achieved- Enrolment', label: '% Target Achieved-Enrolment' },
      { dataExpr: '% Total Target-Enrolment', label: '% Total Target-Enrolment' }
    ],
    options: {
      height: '400',
      scales: {
        xAxes: [{
          stacked: true // this should be set to make the bars stacked
       }],
       yAxes: [{
          stacked: true // this also..
        }]
      }
    }
  };
  data;

  config2 = {
    labelExpr: 'Location',
    datasets: [
      { dataExpr: '% Target Achieved- Certificates', label: '% Target Achieved-Certificates' },
      { dataExpr: '% Total Target-Certificates', label: '% Total Target-Certificates' }
    ],
    options: {
      height: '400',
      scales: {
        xAxes: [{
          stacked: true // this should be set to make the bars stacked
       }],
       yAxes: [{
          stacked: true // this also..
       }]
      }
    }
  };
  data2;

  constructor(private readonly _commonService: CommonService) {
    this.getEnrollmentTarget(this.filters);
    this.getCretificateTarget(this.filters);
  }

  ngOnInit(): void {}

  getEnrollmentTarget(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'teacher-training',
      reportName: 'enrollmentAgainstTargets',
      reportType: 'stackedBarChart',
      stateCode: environment.stateCode,
      filters,
    };

    this._commonService.getReportData(data).subscribe((res) => {
      let result = res.result.data;
      this.filters = res.result.filters;

      this.config.options.height = (result.length * 15 + 150).toString();
      result = result.map(rec => {
        rec['% Total Target-Enrolment'] = Number(Number(100 - rec['% Target Achieved- Enrolment']).toFixed(2));
        return rec;
      });
      this.data = {
        values: result
      };

      console.log(this.config, this.data);
    });
  }

  getCretificateTarget(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'teacher-training',
      reportName: 'certificationAgainstTargets',
      reportType: 'stackedBarChart',
      stateCode: environment.stateCode,
      filters,
    };

    this._commonService.getReportData(data).subscribe((res) => {
      let result = res.result.data;
      this.config2.options.height = (result.length * 15 + 150).toString();
      result = result.map(rec => {
        rec['% Total Target-Certificates'] = Number(Number(100 - rec['% Target Achieved- Certificates']).toFixed(2));
        return rec;
      });
      this.data2 = {
        values: result
      };
    });
  }

  filtersUpdated(filters: any): void {
    this.getEnrollmentTarget(filters);
    this.getCretificateTarget(filters);
  }
}
