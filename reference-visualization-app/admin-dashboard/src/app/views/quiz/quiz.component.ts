import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizzesMetricsData: any;
  quizzesStateData: any;
  filters: any;
  isMapReportLoading = false;
  national: boolean = true;

  constructor(private readonly _commonService: CommonService, private readonly _configService: ConfigService) {
    this.getQuizzesMetricsData();
    this.getQuizzesStateData(this.filters);
   }

  ngOnInit(): void {
    if(environment.config === 'state'){
      this.national = false;
    }
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  getQuizzesMetricsData() {
    this._configService.getVanityMetrics('quiz').subscribe(vanityMetricsRes => {
      this.quizzesMetricsData = vanityMetricsRes.result;
    });
  }

  getQuizzesStateData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'quiz',
      reportName: 'quizzesStarted',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };
    this.isMapReportLoading = true;

    this._commonService.getReportData(data).subscribe(nishthaStateDataRes => {
      this.isMapReportLoading = false;
      this.quizzesStateData = nishthaStateDataRes.result;
      this.filters = nishthaStateDataRes.result.filters;
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getQuizzesStateData(filters);
  }

}
