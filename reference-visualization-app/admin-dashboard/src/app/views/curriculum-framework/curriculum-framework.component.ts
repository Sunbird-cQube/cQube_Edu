import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-curriculum-framework',
  templateUrl: './curriculum-framework.component.html',
  styleUrls: ['./curriculum-framework.component.scss']
})
export class CurriculumFrameworkComponent implements OnInit {
  config: string = environment.config;
  filters: any;
  national: boolean = true;
  isMapReportLoading = true;
  NCFMetrics: any[] | undefined;
  ncfProgressData: any;
  metricFilter: any;

  constructor(private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService, private readonly _configService: ConfigService) {
    this._configService.getVanityMetrics('ncf').subscribe(vanityMetricsRes => {
      this.NCFMetrics = vanityMetricsRes.result;
    });
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

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  filtersUpdated(filters: any): void {
    this.getNcfProgressData(filters, this.metricFilter);
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.getNcfProgressData(this.filters, metricFilter);
  }
}
