import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-micro-improvement',
  templateUrl: './micro-improvement.component.html',
  styleUrls: ['./micro-improvement.component.scss']
})
export class MicroImprovementComponent implements OnInit {

  config: string = environment.config;
  state1: any= 'IN';
  state2: any = 'IN';
  filters1: any;
  filters2: any;
  NVSK: boolean = true;
  isMapReport1Loading = true;
  isMapReport2Loading = true;
  ETBMetrics: any[] | undefined;
  microEffectivenessData: any;
  microProgramData:any;
  microImprovementMetricsData:any;
  microProgramDatayesno:any;

  constructor(private readonly _ETBService: ETBService,
    private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService
  ) {
    this.getMicroProgramData(this.filters1);
    this.getmicroMetricsData();
    this.getMicroProgramyesno(this.filters1);


  }

  ngOnInit(): void {
   
  }

  getMicroProgramData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'micro_improvements',
      reportName: 'micro_improvements',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters:''
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReport2Loading = false;
      this.microProgramData = res.result;
      this.filters1 = res.result.filters;
      if(res.result.code){
        this.state1 = res.result.code;
      }
    }, err => {
      this.isMapReport2Loading = false;
    });
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }


  getMicroProgramyesno(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'micro_improvements',
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
      if(res.result.code){
        this.state1 = res.result.code;
      }
    }, err => {
      this.isMapReport1Loading = false;
    });
  }
  

  getmicroMetricsData() {
    this.microImprovementMetricsData = [
      {
          "name": "Net states",
          "value": "61.1 %",
          "tooltip": "Net states"
      },
      {
          "name": "Net Micro Improvements Projects ",
          "value": "53.4 %",
          "tooltip": "Net Micro Improvements Projects "
      },
      {
          "name": "Net Micro Improvements Started",
          "value": "42 %",
          "tooltip": "Net Micro Improvements Started"
      },
      {
          "name": "Net Micro improvement completed",
          "value": "67.7M",
          "tooltip": "Net Micro improvement completed"
      }
  ];
  }
  
}
