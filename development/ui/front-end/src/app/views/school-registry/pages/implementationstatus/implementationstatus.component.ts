import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-implementationstatus',
  templateUrl: './implementationstatus.component.html',
  styleUrls: ['./implementationstatus.component.scss']
})
export class ImplementationstatusComponent implements OnInit {
  isMapReport1Loading = true;
  filters: any;
  pgiStateData: any;

  constructor(private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService) {
    this.getImplementationStatus(this.filters)
   }

  ngOnInit(): void {
  }

  getImplementationStatus(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'udise',
      reportName: 'implementationStatus',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReport1Loading = false;
      this.pgiStateData = res.result;
      this.filters = res.result.filters;
    }, err => {
      this.isMapReport1Loading = false;
    });
  }

}
