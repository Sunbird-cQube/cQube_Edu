import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nutrition-health',
  templateUrl: './nutrition-health.component.html',
  styleUrls: ['./nutrition-health.component.scss']
})
export class NutritionHealthComponent implements OnInit {
  config: string = environment.config;
  state1: any= 'IN';
  state2: any = 'IN';
  filters1: any;
  filters2: any;
  levels1: any;
  levels2: any;
  metricFilter: any;
  level: string = 'state';

  isMapReport1Loading = true;
  isMapReport2Loading = true;
  NVSK: boolean = true;
  pmposhanMetricsData: any;
  pmPoshanStateData:any;
  pmPoshanStateOnboardedData:any;
  constructor(private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService, private readonly _configService: ConfigService) {
    this.getPmPoshanMetricsData();
    this.getPmPoshanStateData(this.filters1, this.levels1, this.metricFilter);
    this.getStateOnboardedData(this.filters2, this.levels2);
  }

  ngOnInit(): void {
    if(this.config == 'VSK'){
      this.NVSK = false;
    }
  }
  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  getPmPoshanMetricsData() {
    this._configService.getVanityMetrics('pmp').subscribe(vanityMetricsRes => {
      this.pmposhanMetricsData = vanityMetricsRes.result;
    });
  }

  getStateOnboardedData(filters: any, levels:any){
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'pm_poshan',
      reportName: 'state_onboarded',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      levels
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReport1Loading = false;
      this.pmPoshanStateOnboardedData = res.result;
      this.filters2 = res.result.filters;
      this.levels2 = res.result.levels;
      if(res.result.code){
        this.state2 = res.result.code;
      }
    }, err => {
      this.isMapReport1Loading = false;
    });
  }

  getPmPoshanStateData(filters: any, levels: any, metricFilter: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'pm_poshan',
      reportName: 'PM_poshan_access',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      levels,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(pmPoshanStateDataRes => {
      this._spinner.hide()
      this.isMapReport2Loading = false;
      this.pmPoshanStateData = pmPoshanStateDataRes.result;
      this.filters1 = pmPoshanStateDataRes.result.filters;
      this.levels1 = pmPoshanStateDataRes.result.levels;
      this.levels1.forEach((level:any) => {
        this.level = level.selected ? level.value : 'state'
      })
      this.metricFilter = pmPoshanStateDataRes.result.metricFilter;
      if(pmPoshanStateDataRes.result.code){
        this.state1 = pmPoshanStateDataRes.result.code;
      }
    }, err => {
      this.isMapReport2Loading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getPmPoshanStateData(filters, this.levels1, this.metricFilter);
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.getPmPoshanStateData(this.filters1, this.levels1, metricFilter);
  }

  onSelectLevel(event: any): void {
    this.getPmPoshanStateData(this.filters1, event.items, this.metricFilter);
  }

}
