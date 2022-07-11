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
  isMapReportLoading = true;

  constructor(private readonly _NASService: NasService, private readonly _commonService: CommonService) {
    this.getNASMetrics()
    this.getNasData(this.filters);
  }

  ngOnInit(): void {
  }

  getNASMetrics(): void {
    this._NASService.getNASMetrics().subscribe(NASMetricsRes => {
      this.NASMetrics = NASMetricsRes.result;
    });
  }

  getNasData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nas',
      reportName: 'studentPerformance',
      reportType: 'map',
      stateCode: environment.stateCode?.toLocaleLowerCase(),
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.isMapReportLoading = false;
      this.NasStateData = res.result.data;
      this.filters = res.result.filters;
    }, error => {
      this.isMapReportLoading = false;
    });
  }


  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  filtersUpdated(filters: any): void {
    this.getNasData(filters);
  }

}
