import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-state-wise-performance',
  templateUrl: './state-wise-performance.component.html',
  styleUrls: ['./state-wise-performance.component.scss']
})
export class StateWisePerformanceComponent implements OnInit {
  filters: any;
  metricFilter: any;
  levels: any;
  isMapReportLoading = true;
  level: string = 'state';

  pgiMetricsData: any;
  pgiStateData: any;
  tableData: any;
  columns: any[] = [];
  options: Highcharts.Options | undefined;

  constructor(private readonly _commonService: CommonService, private readonly _spinner: NgxSpinnerService) {
    this.getPGIStateData(this.filters, this.levels, this.metricFilter);
  }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  getPGIStateData(filters:any, levels:any, metricFilter: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'pgi',
      reportName: 'pgi_state_performance',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      levels,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.pgiStateData = res.result;
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
    this.getPGIStateData(filters, this.levels, this.metricFilter);
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.getPGIStateData(this.filters, this.levels, metricFilter);
  }
}
