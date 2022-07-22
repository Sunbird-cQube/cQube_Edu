import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NasService } from 'src/app/core/services/nas/nas.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-student-learning-survey-program',
  templateUrl: './student-learning-survey-program.component.html',
  styleUrls: ['./student-learning-survey-program.component.scss']
})
export class StudentLearningSurveyProgramComponent implements OnInit {
  tableData: any;
  columns: any[] = [];
  filters: any[] = [];

  constructor(private readonly _commonService: CommonService) {
    this.getStateWiseNasCoverageData(this.filters);
  }

  ngOnInit(): void {
  }

  getStateWiseNasCoverageData(filters: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nas',
      reportName: 'studentPerformance',
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
    this.getStateWiseNasCoverageData(filters);
  }

}
