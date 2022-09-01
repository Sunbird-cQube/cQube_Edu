import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-report',
  templateUrl: './common-report.component.html',
  styleUrls: ['./common-report.component.scss']
})
export class CommonReportComponent implements OnInit {
  @Output() selectMetricFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() reportsDetails: any;
  
  filters: any;
  isMapReportLoading: boolean = false;
  metricFilter: any;
  reportData: any = {};

  constructor(private readonly _commonService: CommonService, private readonly _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.reportsDetails.forEach((reportDetails:any) => {
      console.log(reportDetails)
      this.getReportData(this.filters, this.metricFilter, reportDetails)
    });
  }

  getReportData(filters: any, metricFilter: any, reportDetails: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: reportDetails.dataSourceName.toLowerCase(),
      reportName: reportDetails.reportName,
      reportType: reportDetails.reportType,
      stateCode: environment.stateCode,
      filters,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.reportData[reportDetails.reportType] = res.result
      console.log(this.reportData)
      this.filters = res.result.filters;
      this.metricFilter = res.result.metricFilter;
    }, err => {
      this.isMapReportLoading = false;
    });
  }
  
  filtersUpdated(filters: any): void {
    this.reportsDetails.forEach((reportDetails:any) => {
      console.log(reportDetails)
      this.getReportData(filters, this.metricFilter, reportDetails)
    });
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.reportsDetails.forEach((reportDetails:any) => {
      console.log(reportDetails)
      this.getReportData(this.filters, metricFilter, reportDetails)
    });
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
}
