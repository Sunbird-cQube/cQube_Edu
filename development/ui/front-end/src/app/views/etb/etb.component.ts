import { Component, OnInit, ViewChild } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { CommonService } from 'src/app/core/services/common/common.service';

import { ETBService } from 'src/app/core/services/etb/etb.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { LeafletMapComponent } from 'src/app/shared/components/maps/leaflet-map/leaflet-map.component';
import { environment } from 'src/environments/environment';
import { QRCoverageAcrossStatesComponent } from './pages/qr-coverage-across-states/qr-coverage-across-states.component';
import { TotalPlaysPerCapitaComponent } from './pages/total-plays-per-capita/total-plays-per-capita.component';

@Component({
  selector: 'app-etb',
  templateUrl: './etb.component.html',
  styleUrls: ['./etb.component.scss']
})
export class EtbComponent implements OnInit {
  selectedState:Number = 0;
  ETBStateData: any;
  filters: any;
  isMapReportLoading = true;

  config: string = environment.config
  NVSK: boolean = true;

  ETBMetrics: any[] | undefined;
  ETBProgramStatsByLocation: any;

  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  options: Highcharts.Options | undefined;

  @ViewChild(LeafletMapComponent) leafletComponent!: LeafletMapComponent;
  @ViewChild(QRCoverageAcrossStatesComponent) qrCoverageAcrossStatesComponent!: QRCoverageAcrossStatesComponent;
  @ViewChild(TotalPlaysPerCapitaComponent) totalPlaysPerCapitaComponent!: TotalPlaysPerCapitaComponent;

  constructor(private readonly _ETBService: ETBService,private readonly _nishthaService: NishthaService, private readonly _commonService: CommonService) {
    let params: any = {
      "version": "1.0"
    }
    let data:any = "ETB & E-content"
    this._nishthaService.getNishthaVanityMetrics(data).subscribe(dashboardMenuResult => {
      this.ETBMetrics = dashboardMenuResult.result[1]?.metrics;
    });

    // this.getETBMetrics();
    this.getETBProgramStatsByLocation();
    this._nishthaService.getStateWiseEnrollmentData(params['version']).subscribe(res => {
      this.options = {
        chart: {
          events: {
            load: function (this: any) {
              let categoryHeight = 20;
              this.update({
                chart: {
                  height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                }
              })
            }
          }
        },
        xAxis: {
          categories: res.result.map((record: any) => {
            return record['State'];
          })
        },
        yAxis: {
          opposite: true
        },
        series: [{
          type: 'bar',
          name: 'Total Enrollments',
          data: res.result.map((record: any) => record['Total Enrollments'])
        }, {
          type: 'bar',
          name: 'Total Certifications',
          data: res.result.map((record: any) => record['Total Certifications'])
        }]
      };

      this.stateWiseEnrollmentData = res.result;
    });
    this.getETBData(this.filters);
  }

  ngOnInit(): void {
    if (this.config == 'VSK') {
      this.NVSK = false;
    }
  }

  getETBMetrics(): void {
    this._ETBService.getETBMetrics().subscribe(ETBMetricsRes => {
      this.ETBMetrics = ETBMetricsRes.result;
    });
  }

  getETBProgramStatsByLocation(): void {
    this._ETBService.getETBProgramStatsByLocation().subscribe(ETBProgramStatsByLocationRes => {
      this.ETBProgramStatsByLocation = ETBProgramStatsByLocationRes.result;
    });
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  getETBData(filters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'etb',
      reportName: 'statesEnergizedTextBooks',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.isMapReportLoading = false;
      this.ETBStateData = res.result;
      this.filters = res.result.filters;
    }, error => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getETBData(filters);
  }

}
