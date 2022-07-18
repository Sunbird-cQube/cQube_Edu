import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  quizzesMetricsData: any;
  quizzesStateData: any;
  filters: any;
  isMapReportLoading = false;

  constructor(private readonly _commonService: CommonService) {
    this.getQuizzesMetricsData();
    this.getQuizzesStateData(this.filters);
   }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  getQuizzesMetricsData() {
    this.quizzesMetricsData = [
      {
          "name": "Total Quizzes",
          "value": "4",
          "tooltip": "Total Quizzes"
      },
      {
        "name": "Total Medium",
          "value": "2 ",
          "tooltip": "Total Medium"
      },
      {
        "name": "Total States Participating",
          "value": "34",
          "tooltip": "Total States Participating"
      },
      {
        "name": "Total Enrollment",
          "value": "18.3K ",
          "tooltip": "Total Enrollment"
      },
      {
        "name": "Total Certification",
          "value": "12.4K ",
          "tooltip": "Total Certification "
      }
    ];
  }

  getQuizzesStateData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'quizzes',
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
