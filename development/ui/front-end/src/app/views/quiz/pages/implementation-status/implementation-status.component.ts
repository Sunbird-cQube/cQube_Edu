import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-implementation-status',
  templateUrl: './implementation-status.component.html',
  styleUrls: ['./implementation-status.component.scss']
})
export class ImplementationStatusComponent implements OnInit {
  isMapReport1Loading = true;
  filters: any;
  implementationStatusData: any;

  constructor(private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService) {
    this.getImplementationStatus(this.filters)
   }

  ngOnInit(): void {
  }

  getImplementationStatus(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'quizzes',
      reportName: 'implementationStatus',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReport1Loading = false;
      this.implementationStatusData = res.result;
      this.filters = res.result.filters;
    }, err => {
      this.isMapReport1Loading = false;
    });
  }
}
