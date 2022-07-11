import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NasService } from 'src/app/core/services/nas/nas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nas',
  templateUrl: './nas.component.html',
  styleUrls: ['./nas.component.scss']
})
export class NasComponent implements OnInit {
  NASMetrics: any[] | undefined;
  NASProgramStatsByLocation: any
  NasStateData: any;
  filters: any;

  constructor(private readonly _NASService: NasService, private readonly _commonService: CommonService) {
    this.getNASMetrics()
    this.getNasData();
  }

  ngOnInit(): void {
  }

  getNASMetrics(): void {
    this._NASService.getNASMetrics().subscribe(NASMetricsRes => {
      this.NASMetrics = NASMetricsRes.result;
      
    });
  }

  getNasData(): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nas',
      reportName: 'studentPerformance',
      reportType: 'map',
      stateCode: environment.stateCode?.toLocaleLowerCase(),
      filters: this.filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.NasStateData = res.result.data;
      this.filters = res.result.filters;
    });
  }


  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

}
