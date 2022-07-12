import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';

import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nishtha-program-detail',
  templateUrl: './nishtha-program-detail.component.html',
  styleUrls: ['./nishtha-program-detail.component.scss']
})
export class NishthaProgramDetailComponent implements OnInit {
  nishithaStateData: any;
  filters: any;
  isMapReportLoading = true;

  constructor(private readonly _commonService: CommonService) {
    this.getNishithaData(this.filters);
  }

  ngOnInit(): void {
  }

  getNishithaData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nishtha',
      reportName: 'programStatus',
      reportType: 'map',
      stateCode: environment.stateCode?.toLocaleLowerCase(),
      filters
    };

    this._commonService.getReportData(data).subscribe(nishthaStateDataRes => {
      this.isMapReportLoading = false;
      this.nishithaStateData = nishthaStateDataRes.result.data;
      this.filters = nishthaStateDataRes.result.filters;
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getNishithaData(filters);
  }
}
