import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry-status',
  templateUrl: './entry-status.component.html',
  styleUrls: ['./entry-status.component.scss']
})
export class EntryStatusComponent implements OnInit {
  ETBStateData: any;
  filters: any;
  isMapReportLoading = true;
  fileName: string = "Report_data";

  constructor(private readonly _commonService: CommonService, private readonly _configService: ConfigService) {
    this.getETBData(this.filters);
  }

  ngOnInit(): void {
  }

  getETBData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'digital_learning',
      reportName: 'entryStatus',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.isMapReportLoading = false;
      this.ETBStateData = res.result;
      this.filters = res.result.filters;
    }, error => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getETBData(filters);
  }
}
