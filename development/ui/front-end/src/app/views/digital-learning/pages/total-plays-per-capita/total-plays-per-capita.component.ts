import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-total-plays-per-capita',
  templateUrl: './total-plays-per-capita.component.html',
  styleUrls: ['./total-plays-per-capita.component.scss']
})
export class TotalPlaysPerCapitaComponent implements OnInit {
  isMapReportLoading = true;
  totalPlaysPerCapitaData: any;
  filters: any;

  constructor(private readonly _commonService: CommonService) {
    this.getTotalPlaysPerCapita(this.filters);
  }

  ngOnInit(): void {
  }

  getTotalPlaysPerCapita(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'totalPlaysPerCapita',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.isMapReportLoading = false;
      this.totalPlaysPerCapitaData = res.result;
      this.filters = res.result.filters;
    }, error => {
      this.isMapReportLoading = false;
    });
  }

}
