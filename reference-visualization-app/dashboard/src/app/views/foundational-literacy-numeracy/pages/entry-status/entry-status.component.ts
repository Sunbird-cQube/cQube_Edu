import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry-status',
  templateUrl: './entry-status.component.html',
  styleUrls: ['./entry-status.component.scss']
})
export class EntryStatusComponent implements OnInit {

  tableData: any;
  filters: any[] = [];
  fileName: string = "Entry_Status";

  constructor(private readonly _commonService: CommonService) {
    this.getStateWiseNasCoverageData(this.filters);
  }

  ngOnInit(): void {
  }

  getStateWiseNasCoverageData(filters: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'foundation_literacy_numeracy',
      reportName: 'entryStatus',
      reportType: 'loTable',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.tableData = res.result;
      this.filters = res.result.filters;
    });
  }

  filtersUpdated(filters: any): void {
    this.getStateWiseNasCoverageData(filters);
  }

}
