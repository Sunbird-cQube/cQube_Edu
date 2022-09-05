import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-report',
  templateUrl: './common-report.component.html',
  styleUrls: ['./common-report.component.scss']
})
export class CommonReportComponent implements OnInit, OnChanges {
  @Output() selectMetricFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() reportsDetails: any;
  
  filters: any;
  isMapReportLoading: boolean = false;
  metricFilter: any;
  reportData: any = {};
  levels: any;
  level: string = 'state';

  constructor(private readonly _commonService: CommonService, private readonly _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.reportsDetails.forEach((reportDetails:any) => {
      this.getReportData(this.filters, this.metricFilter, this.levels, reportDetails)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getReportData(filters: any, metricFilter: any, levels: any, reportDetails: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: reportDetails.dataSourceName.toLowerCase(),
      reportName: reportDetails.reportName,
      reportType: reportDetails.reportType,
      stateCode: environment.stateCode,
      filters,
      levels,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.reportData[reportDetails.reportType] = res.result;
      console.log(res.result)
      this.filters = res.result.filters;
      this.levels = res.result.levels;
      this.levels.forEach((level:any) => {
        this.level = level.selected ? level.value : 'state'
      })
      this.metricFilter = res.result.metricFilter;
    }, err => {
      this.isMapReportLoading = false;
    });
  }
  
  filtersUpdated(filters: any): void {
    this.reportsDetails.forEach((reportDetails:any) => {
      this.getReportData(filters, this.metricFilter, this.levels, reportDetails)
    });
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.reportsDetails.forEach((reportDetails:any) => {
      this.getReportData(this.filters, metricFilter, this.levels, reportDetails)
    });
  }

  onSelectLevel(event: any): void {
    this.reportsDetails.forEach((reportDetails:any) => {
      this.getReportData(this.filters, this.metricFilter, event.items, reportDetails)
    });
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  hyperlinkClicked(hierarchyLevel: any):void {
    this.filters.map((filter:any) => {
      if(filter.hierarchyLevel && filter.hierarchyLevel > hierarchyLevel){
        filter.value = null;
      }
    })
    this.reportsDetails.forEach((reportDetails:any) => {
      console.log(reportDetails)
      this.getReportData(this.filters, this.metricFilter, this.levels, reportDetails)
    });
  }
}
