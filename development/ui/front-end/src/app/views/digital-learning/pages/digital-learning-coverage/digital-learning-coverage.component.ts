import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-digital-learning-coverage',
  templateUrl: './digital-learning-coverage.component.html',
  styleUrls: ['./digital-learning-coverage.component.scss']
})
export class DigitalLearningCoverageComponent implements OnInit {
  tableData: any;
  gaugeChartOptions: Highcharts.Options | undefined;
  gaugeChartProperties: any | undefined;
  filters: any;
  NVSK = true;
  QRGaugeData: any;

  constructor(private readonly _commonService: CommonService) {
    if(environment.config === 'VSK') {
      this.NVSK = false;
    }

    this.getStateWiseETBCoverageData(this.filters);

    if (!this.NVSK) {
      this.getQRGaugeData(this.filters);
    }
  }

  ngOnInit(): void {
  }

  getStateWiseETBCoverageData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'statesEnergizedTextBooks',
      reportType: 'loTable',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.tableData = res.result;
      this.filters = res.result.filters;

      if (this.NVSK) {
        this.gaugeChartProperties = res.result.gaugeChart;

        if (this.gaugeChartProperties) {
          this.gaugeChartOptions = {
            title: {
              text: ""
            },
            yAxis: {
              title: {
                y: 130,
                text: this.gaugeChartProperties.title
              }
            },
            series: [{
              type: 'solidgauge',
              name: 'Speed',
              data: [this.gaugeChartProperties.percentage],
              innerRadius: '80%',
              dataLabels: {
                  y: -20,
                  format:
                      '<div style="text-align:center"><br>' +
                      '<span style="font-size:25px">{y}' + (this.gaugeChartProperties.valueSuffix ? this.gaugeChartProperties.valueSuffix : "") + '</span><br/>' +
                      '</div>'
              },
              tooltip: {
                  valueSuffix: this.gaugeChartProperties.valueSuffix ? ` ${this.gaugeChartProperties.valueSuffix}` : ''
              }
            }]
          }
        }
      }
    });
  }

  filtersUpdated(filters: any): void {
    this.getStateWiseETBCoverageData(filters);

    if (!this.NVSK) {
      //this.getQRGaugeData(filters);
    }
  }

  getQRGaugeData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'statesEnergizedTextBooks',
      reportType: 'gaugeChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.QRGaugeData = res.result.data;

      if (this.QRGaugeData) {
        this.gaugeChartOptions = {
          title: {
            text: ""
          },
          yAxis: {
            title: {
              y: 120,
              text: this.QRGaugeData.options.title
            },
            labels: {
              distance: -10
            }
          },
          series: [{
            type: 'solidgauge',
            name: 'Speed',
            data: [this.QRGaugeData.percentage],
            innerRadius: '80%',
            dataLabels: {
                format:
                    '<div style="text-align:center"><br>' +
                    '<span style="font-size:1rem">{y}' + (this.QRGaugeData.options.valueSuffix ? this.QRGaugeData.options.valueSuffix : "") + '</span><br/>' +
                    '</div><br><br><br>'
            },
            tooltip: {
                valueSuffix: this.QRGaugeData.options.valueSuffix ? ` ${this.QRGaugeData.options.valueSuffix}` : ''
            }
          }]
        }
      }
    });
  }
}
