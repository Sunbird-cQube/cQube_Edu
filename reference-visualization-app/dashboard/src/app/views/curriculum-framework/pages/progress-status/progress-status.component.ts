import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-progress-status',
  templateUrl: './progress-status.component.html',
  styleUrls: ['./progress-status.component.scss']
})
export class ProgressStatusComponent implements OnInit {
  filters: any;
  isMapReportLoading = true;
  metricFilter: any;
  fileName: string = "Report_data";
  ncfProgressData: any;

  constructor(private readonly _commonService: CommonService, private readonly _spinner: NgxSpinnerService) {
    this.getNcfProgressData(this.filters, this.metricFilter);
  }

  ngOnInit(): void {
  }

  getNcfProgressData(filters: any, metricFilter:any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'curriculum_framework',
      reportName: 'progressOfNCF',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.ncfProgressData = res.result;
      this.filters = res.result.filters;
      this.metricFilter = res.result.metricFilter;
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getNcfProgressData(filters, this.metricFilter);
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.getNcfProgressData(this.filters, metricFilter);
  }

}
