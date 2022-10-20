import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-improvement-program',
  templateUrl: './improvement-program.component.html',
  styleUrls: ['./improvement-program.component.scss']
})
export class ImprovementProgramComponent implements OnInit {
  config: string = environment.config;
  filters1: any;
  filters2: any;
  metricFilter: any;
  national: boolean = true;
  isMapReportLoading = true;
  isMapReport1Loading = true;
  isMapReport2Loading = true;
  ETBMetrics: any[] | undefined;
  microEffectivenessData: any;
  microProgramData:any;
  microImprovementMetricsData:any;
  microProgramDatayesno:any;
  fileName: string = "MIP_Implementation_Status";
  tabIndex = 0;

  constructor(private readonly _configService: ConfigService, private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService) {
    this.getMicroProgramyesno(this.filters1);
    this.getmicroMetricsData();
    
  }

  ngOnInit(): void {
   
  }

  getMicroProgramData(filters: any, metricFilter: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'improvement_program',
      reportName: 'micro_improvements',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReport2Loading = false;
      this.microProgramData = res.result;
      this.filters1 = res.result.filters;
      this.metricFilter = res.result.metricFilter;
    }, err => {
      this.isMapReport2Loading = false;
    });
  }

  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    if(this.tabIndex === 0){
      this.getMicroProgramyesno(this.filters1);
    }
    else if (this.tabIndex === 1) {
      this.getMicroProgramData(this.filters1, this.metricFilter);
    }
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);

  }


  getMicroProgramyesno(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'improvement_program',
      reportName: 'micro_improvements_program',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters:''
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReport1Loading = false;
      this.microProgramDatayesno = res.result;
      this.filters1 = res.result.filters;
    }, err => {
      this.isMapReport1Loading = false;
    });
  }
  

  getmicroMetricsData() {
    this._configService.getVanityMetrics('mip').subscribe(vanityMetricsRes => {
      this.microImprovementMetricsData = vanityMetricsRes.result;
    });
  }
  
  onSelectMetricFilter(metricFilter: any): void {
    this.getMicroProgramData(this.filters1, metricFilter);
  }
}
