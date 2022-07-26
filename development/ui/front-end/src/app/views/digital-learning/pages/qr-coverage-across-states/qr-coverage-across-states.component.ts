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
  qrCoverageBarData: any;
  ETBProgramStatsByLocation: any;
  filters: any;
  barChartOptions: Highcharts.Options | undefined;
  gaugeChartOptions: Highcharts.Options | undefined;
  gaugeChartProperties: any | undefined;

  @ViewChild(LeafletMapComponent) leafletComponent!: LeafletMapComponent;

  constructor(private readonly _commonService: CommonService) {
    this.getStateWiseETBQRCoverageData(this.filters);
    this.getStateWiseETBQRCoverageDataForBar(this.filters);
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

      this.gaugeChartProperties = res.result.gaugeChart;

      if (this.gaugeChartProperties) {
        this.gaugeChartOptions = {
          title: {
            text: ""
          },
          yAxis: {
            title: {
              y: 50,
              text: this.gaugeChartProperties.title
            },
            labels: {
              distance: -10
            }
          },
          series: [{
            type: 'solidgauge',
            name: 'Speed',
            data: [this.gaugeChartProperties.percentage],
            innerRadius: '80%',
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:1rem">{y}' + (this.gaugeChartProperties.valueSuffix ? this.gaugeChartProperties.valueSuffix : "") + '</span><br/>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: this.gaugeChartProperties.valueSuffix ? ` ${this.gaugeChartProperties.valueSuffix}` : ''
            }
          }]
        }
      }
    });
  }

}
