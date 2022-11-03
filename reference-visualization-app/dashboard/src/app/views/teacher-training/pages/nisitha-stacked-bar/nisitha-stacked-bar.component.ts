import { Component, OnInit } from '@angular/core';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { CommonService } from 'src/app/core/services/common/common.service';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { environment } from 'src/environments/environment';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';

@Component({
  selector: 'app-nisitha-stacked-bar',
  templateUrl: './nisitha-stacked-bar.component.html',
  styleUrls: ['./nisitha-stacked-bar.component.scss'],
})
export class NisithaStackedBarComponent implements OnInit {
  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  enrollmentTargetChartOptions: Highcharts.Options | undefined;
  certificateTargetChartOptions: Highcharts.Options | undefined;
  filters: any;
  config;
  data;
  fileName: string = "NISHTA_%_against_Potential_Base";

  config2;
  data2;

  constructor(private readonly _commonService: CommonService) {
    this.getEnrollmentTarget(this.filters);
    this.getCretificateTarget(this.filters);
  }

  ngOnInit(): void {}

  getEnrollmentTarget(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'teacher-training',
      reportName: 'enrollmentAgainstTargets',
      reportType: 'stackedBarChart',
      stateCode: environment.stateCode,
      filters,
    };

    this._commonService.getReportData(data).subscribe((res) => {
      let result = res.result.data;
      this.filters = res.result.filters;
      result = result.map(rec => {
        rec['% Total Target-Enrolment'] = Number(Number(100 - rec['% Target Achieved- Enrolment']).toFixed(2));
        return rec;
      });

      this.config = getChartJSConfig({
        labelExpr: 'Location',
        datasets: getBarDatasetConfig([
          { dataExpr: '% Target Achieved- Enrolment', label: '% Target Achieved-Enrolment' },
          { dataExpr: '% Total Target-Enrolment', label: '% Total Target-Enrolment' }
        ]),
        options: {
          height: (result.length * 15 + 150).toString(),
          scales: {
            xAxes: [{
              stacked: true, // this should be set to make the bars stacked
              scaleLabel: {
                display: true,
                labelString: '% Target Achieved-Enrolment and % Total Target-Enrolment'
              }
           }],
           yAxes: [{
              stacked: true, // this also..
              scaleLabel: {
                display: true,
                labelString: environment.config === 'state' ? 'Programs' : 'States'
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let multistringText = [];                
  
                if (tooltipItem.datasetIndex === 0) {
                  multistringText.push(`Target Achieved: ${result[tooltipItem.index]['% Target Achieved- Enrolment']}%`);
                  multistringText.push(`Actual Enrolment: ${formatNumberForReport(result[tooltipItem.index]['Total Enrolments'])}`);
                  multistringText.push(`Total Expected Enrolment: ${formatNumberForReport(result[tooltipItem.index]['Total Expected Enrolment'])}`);
                }

                return multistringText;
              }
            }
          }
        }
      });
      
      console.log(this.config);
      

      this.data = {
        values: result
      };
    });
  }

  getCretificateTarget(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'teacher-training',
      reportName: 'certificationAgainstTargets',
      reportType: 'stackedBarChart',
      stateCode: environment.stateCode,
      filters,
    };

    this._commonService.getReportData(data).subscribe((res) => {
      let result = res.result.data;      
      result = result.map(rec => {
        rec['% Total Target-Certificates'] = Number(Number(100 - rec['% Target Achieved- Certificates']).toFixed(2));
        return rec;
      });

      this.config2 = getChartJSConfig({
        labelExpr: 'Location',
        datasets: getBarDatasetConfig([
          { dataExpr: '% Target Achieved- Certificates', label: '% Target Achieved-Certificates' },
          { dataExpr: '% Total Target-Certificates', label: '% Total Target-Certificates' }
        ]),
        options: {
          height: (result.length * 15 + 150).toString(),
          scales: {
            xAxes: [{
              stacked: true, // this should be set to make the bars stacked
              scaleLabel: {
                display: true,
                labelString: '% Target Achieved-Certificates and % Total Target-Certificates'
              }
           }],
           yAxes: [{
              stacked: true, // this also..
              scaleLabel: {
                display: true,
                labelString: environment.config === 'state' ? 'Programs' : 'States'
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let multistringText = [];                
  
                if (tooltipItem.datasetIndex === 0) {
                  multistringText.push(`Target Achieved: ${result[tooltipItem.index]['% Target Achieved- Certificates']}%`); 
                  multistringText.push(`Actual Certification: ${formatNumberForReport(result[tooltipItem.index]['Actual Certification'])}`);
                  multistringText.push(`Total Expected Enrolment: ${formatNumberForReport(result[tooltipItem.index]['Total Expected Enrolment'])}`);
                }

                return multistringText;
              }
            }
          }
        }
      });

      this.data2 = {
        values: result
      };
    });
  }

  filtersUpdated(filters: any): void {
    this.getEnrollmentTarget(filters);
    this.getCretificateTarget(filters);
  }
}
