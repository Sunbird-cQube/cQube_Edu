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
  filters1: any;
  filters2: any;
  levels1: any;
  levels2: any;
  metricFilter: any;
  tabIndex = 0;
  level: string = 'state';
  fileName: string = "PM_Poshan_Implementation_Status";

  isMapReport1Loading = true;
  isMapReport2Loading = true;
  national: boolean = true;
  pmposhanMetricsData: any;
  pmPoshanStateData:any;
  pmPoshanStateOnboardedData:any;
  constructor(private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService, private readonly _configService: ConfigService) {
    if(this.config == 'state'){
      this.national = false;
      this.getPmPoshanStateData(this.filters1, this.levels1, this.metricFilter);
    }
    else {
      this.getStateOnboardedData(this.filters2, this.levels2);
    }
    this.getPmPoshanMetricsData();
    
  }

  ngOnInit(): void {
  }
  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    if((this.tabIndex === 1 && this.national) || (this.tabIndex === 0 && !this.national)){
      this.getPmPoshanStateData(this.filters1, this.levels1, this.metricFilter);
    }
    else if(this.tabIndex === 0 && this.national) {
      this.getStateOnboardedData(this.filters2, this.levels2);
    }
    
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
      dataSourceName: 'nutrition_health',
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
    }, err => {
      this.isMapReport1Loading = false;
    });
  }

  getPmPoshanStateData(filters: any, levels: any, metricFilter: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nutrition_health',
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
