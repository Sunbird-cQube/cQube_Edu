import { Component, OnInit } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  barData: any;
  participantsByState: any;
  data: any;
  config: any;
  filters: any;
  fileName1: string = "DiSanc_Survey_map_data";
  fileName2: string = "DiSanc_Survey_barchart_data";

  constructor(private readonly _commonService: CommonService) {
    this.getParticipantsByState(this.filters);
    this.getParticipantsByLocation(this.filters);
  }

  ngOnInit(): void {
  }

  getParticipantsByState(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'curriculum_framework',
      reportName: 'participantsByState',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.participantsByState = res.result;
      this.filters = res.result.filters;
    });
  }

  getParticipantsByLocation(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'curriculum_framework',
      reportName: 'participantsByLocation',
      reportType: 'barChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.filters = res.result.filters;
      this.config = getChartJSConfig({
        labelExpr: 'Language',
        datasets: getBarDatasetConfig([
          { dataExpr: 'Number of Participants', label: 'Number of Participants' }
        ]),
        options: {
          responsive: true,
          height: (result.length * 15 + 150).toString(),
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let multistringText = [];                
  
                multistringText.push(`Number of Participants: ${formatNumberForReport(result[tooltipItem.index]['Number of Participants'])}`);

                return multistringText;
              }
            }
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Languages'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Number of Participants'
              }
            }]
          }
        }
      });

      this.data = { values: result };
    });
  }

}
