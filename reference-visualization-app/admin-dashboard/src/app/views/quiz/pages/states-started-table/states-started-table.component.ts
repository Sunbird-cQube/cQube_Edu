import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-states-started-table',
  templateUrl: './states-started-table.component.html',
  styleUrls: ['./states-started-table.component.scss']
})
export class StatesStartedTableComponent implements OnInit {

  tableData: any;
  filters: any;

  constructor(private readonly _commonService: CommonService) {
    this.getStateWiseQuizzesCoverageData(this.filters);
  }

  ngOnInit(): void {
  }

  getStateWiseQuizzesCoverageData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'quiz',
      reportName: 'quizzesStarted',
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
    this.getStateWiseQuizzesCoverageData(filters);
  }

}
