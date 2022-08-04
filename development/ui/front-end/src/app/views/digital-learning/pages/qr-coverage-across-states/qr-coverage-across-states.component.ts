import { Component, OnInit, ViewChild } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { LeafletMapComponent } from 'src/app/shared/components/maps/leaflet-map/leaflet-map.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-coverage-across-states',
  templateUrl: './qr-coverage-across-states.component.html',
  styleUrls: ['./qr-coverage-across-states.component.scss']
})
export class QRCoverageAcrossStatesComponent implements OnInit {
  NVSK: boolean = true;
  qrCoverageBarData: any;
  ETBProgramStatsByLocation: any;
  filters: any;
  barChartOptions: Highcharts.Options | undefined;
  gaugeChartOptions: Highcharts.Options | undefined;
  QRGaugeData: any | undefined;
  tableData: any;

  @ViewChild(LeafletMapComponent) leafletComponent!: LeafletMapComponent;

  constructor(private readonly _commonService: CommonService) {
    if(environment.config === 'VSK'){
      this.NVSK = false;
    }
    if(this.NVSK){
      this.getStateWiseETBQRCoverageData(this.filters);
      this.getStateWiseETBQRCoverageDataForBar(this.filters);
    } else {
      this.getQrVskData(this.filters);
      this.getQRGaugeData(this.filters);
    }
  }

  ngOnInit(): void {
  }

  getStateWiseETBQRCoverageData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'qrCodeCoverageAcrossStates',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(ETBProgramStatsByLocationRes => {
      this.ETBProgramStatsByLocation = ETBProgramStatsByLocationRes.result;
      this.filters = ETBProgramStatsByLocationRes.result.filters;
    });
  }

  getStateWiseETBQRCoverageDataForBar(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'qrCodeCoverageAcrossStates',
      reportType: 'barChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.filters = res.result.filters;

      this.barChartOptions = {
        chart: {
          // events: {
          //   load: function(this: any) {
          //     let categoryHeight = 20;
          //     this.update({
          //       chart: {
          //         height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
          //       }
          //     })
          //   }
          // }
        },
        xAxis: {
          categories: result.map((record: any) => {
            return record['Location'];
          })
        },
        yAxis: {
          opposite: true
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          floating: false,
          borderWidth: 0,
          shadow: false,
          reversed: true
        },
        series: [{
          type: 'bar',
          name: 'Content Coverage on QR',
          data: result.map((record: any) => record['QR Coverage'])
        }]
      };

      this.QRGaugeData = res.result.gaugeChart;

      if (this.QRGaugeData) {
        this.gaugeChartOptions = {
          title: {
            text: ""
          },
          yAxis: {
            title: {
              y: 120,
              text: this.QRGaugeData.title
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
                    '<span style="font-size:1rem">{y}' + (this.QRGaugeData.valueSuffix ? this.QRGaugeData.valueSuffix : "") + '</span><br/>' +
                    '</div><br><br><br>'
            },
            tooltip: {
                valueSuffix: this.QRGaugeData.valueSuffix ? ` ${this.QRGaugeData.valueSuffix}` : ''
            }
          }]
        }
      }
    });
  }

  filtersUpdated(filters: any): void {
    this.getQrVskData(filters);
    //this.getQRGaugeData(filters);
  }

  getQrVskData(filters: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'qrCodeCoverageAcrossStates',
      reportType: 'loTable',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.tableData = res.result;
      this.filters = res.result.filters;
    });
  }

  getQRGaugeData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'qrCodeCoverageAcrossStates',
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
