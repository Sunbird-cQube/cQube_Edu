import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-total-courses-table',
  templateUrl: './total-courses-table.component.html',
  styleUrls: ['./total-courses-table.component.scss']
})
export class TotalCoursesTableComponent implements OnInit {
  tableData: any;
  columns: any[] = [];
  filters: any;

  constructor(private readonly _commonService: CommonService) {
    this.gettotalCoursesAndMediumData(this.filters);
  }

  ngOnInit(): void {
  }

  gettotalCoursesAndMediumData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nishtha',
      reportName: 'totalCoursesAndMedium',
      reportType: 'loTable',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;
      this.filters = res.result.filters;

    });
  }

  filtersUpdated(filters: any): void {
    this.gettotalCoursesAndMediumData(filters);
  }


}
