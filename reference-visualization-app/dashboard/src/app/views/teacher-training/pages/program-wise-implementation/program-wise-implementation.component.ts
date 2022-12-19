import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program-wise-implementation',
  templateUrl: './program-wise-implementation.component.html',
  styleUrls: ['./program-wise-implementation.component.scss'],
})
export class ProgramWiseImplementationComponent implements OnInit {
  tableData: any;
  filters: any;
  fileName: string = "NISHTA_Implementation_Status";

  constructor(private readonly _commonService: CommonService) {
    this.gettotalCoursesAndMediumData(this.filters);
  }

  ngOnInit(): void {}

  gettotalCoursesAndMediumData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'teacher-training',
      reportName: 'implementationStatus',
      reportType: 'loTable',
      stateCode: environment.stateCode,
      filters,
    };

    this._commonService.getReportData(data).subscribe((res) => {
      this.tableData = res.result;
      this.filters = res.result.filters;
    });
  }

  filtersUpdated(filters: any): void {
    this.gettotalCoursesAndMediumData(filters);
  }
}
