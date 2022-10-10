import { Component, OnInit, ViewChild } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
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
  national: boolean = true;
  qrCoverageBarData: any;
  ETBProgramStatsByLocation: any;
  filters: any;
  QRGaugeData: any | undefined;
  tableData: any;
  fileName: string = "Report_data";

  config;
  data;

  @ViewChild(LeafletMapComponent) leafletComponent!: LeafletMapComponent;

  constructor(private readonly _commonService: CommonService) {
    if(environment.config === 'state'){
      this.national = false;
    }
    if(this.national){
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
      dataSourceName: 'digital_learning',
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
      dataSourceName: 'digital_learning',
      reportName: 'qrCodeCoverageAcrossStates',
      reportType: 'barChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      let result = res.result.data;
      this.filters = res.result.filters;
      this.config = getChartJSConfig({
        labelExpr: 'Location',
        datasets: getBarDatasetConfig([
          { dataExpr: 'QR Coverage', label: 'Content Coverage on QR' }
        ]),
        options: {
          responsive: true,
          height: (result.length * 15 + 150).toString(),
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let multistringText = [];                
  
                multistringText.push(`Content Coverage on QR: ${result[tooltipItem.index]['QR Coverage']}%`);

                return multistringText;
              }
            }
          }
        }
      });

      this.data = { values: result };

      let gaugeChart = res.result.gaugeChart;
      this.QRGaugeData = {
        options: {
          title: gaugeChart.title,
          valueSuffix: gaugeChart.valueSuffix ? ` ${gaugeChart.valueSuffix}` : ''
        },
        percentage: gaugeChart.percentage
      };
    });
  }

  filtersUpdated(filters: any): void {
    this.getQrVskData(filters);
    //this.getQRGaugeData(filters);
  }

  getQrVskData(filters: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'digital_learning',
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
      dataSourceName: 'digital_learning',
      reportName: 'qrCodeCoverageAcrossStates',
      reportType: 'gaugeChart',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.QRGaugeData = res.result.data;
    });
  }

}
