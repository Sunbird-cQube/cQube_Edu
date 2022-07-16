import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pm-poshan',
  templateUrl: './pm-poshan.component.html',
  styleUrls: ['./pm-poshan.component.scss']
})
export class PmPoshanComponent implements OnInit {
  config: string = environment.config;
  state: any= 'IN';
  state2: any = 'IN';
  filters: any;
  filters1: any;
  isMapReportLoading = true;
  NVSK: boolean = true;
  pmposhanMetricsData: any;
  pmPoshanStateData:any;
  pmPoshanStateOnboardedData:any;
  constructor(private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService) {
    this.getUdiseMetricsData();
    this.getPmPoshanStateData(this.filters);
    this.getStateOnboardedData(this.filters1);
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

  getUdiseMetricsData() {
    this.pmposhanMetricsData = [
      {
        "name": "Total States Participating",
        "value": "17 ",
        "tooltip": "Total States Participating"
      },
      {
        "name": "Total Schools",
        "value": "3.9 L",
        "tooltip": "Total Schools"
      },
      {
        "name": "Total Meals Served",
        "value": "15.5 L",
        "tooltip": "Total Meals Served"
      },
    ];
  }

  getStateOnboardedData(filters: any){
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'pm_poshan',
      reportName: 'state_onboarded',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.pmPoshanStateOnboardedData = res.result.data;
      this.filters = res.result.filters;
      if(res.result.code){
        this.state2 = res.result.code;
      }
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  getPmPoshanStateData(filters: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'pm_poshan',
      reportName: 'PM_poshan_access',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(pmPoshanStateDataRes => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.pmPoshanStateData = pmPoshanStateDataRes.result.data;
      this.filters = pmPoshanStateDataRes.result.filters;
      if(pmPoshanStateDataRes.result.code){
        this.state = pmPoshanStateDataRes.result.code;
      }
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getPmPoshanStateData(filters);
  }

}
