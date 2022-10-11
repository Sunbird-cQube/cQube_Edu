import { Component, OnInit, ViewChild } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';

import { ETBService } from 'src/app/core/services/etb/etb.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { LeafletMapComponent } from 'src/app/shared/components/maps/leaflet-map/leaflet-map.component';
import { environment } from 'src/environments/environment';
import { QRCoverageAcrossStatesComponent } from './pages/qr-coverage-across-states/qr-coverage-across-states.component';
import { TotalPlaysPerCapitaComponent } from './pages/total-plays-per-capita/total-plays-per-capita.component';

@Component({
  selector: 'app-digital-learning',
  templateUrl: './digital-learning.component.html',
  styleUrls: ['./digital-learning.component.scss']
})
export class DigitalLearningComponent implements OnInit {
  selectedState:Number = 0;
  ETBStateData: any;
  filters: any;
  isMapReportLoading = true;
  fileName: string = "Report_data";

  config: string = environment.config
  national: boolean = true;

  ETBMetrics: any[] | undefined;
  ETBProgramStatsByLocation: any;

  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  options: Highcharts.Options | undefined;

  @ViewChild(LeafletMapComponent) leafletComponent!: LeafletMapComponent;
  @ViewChild(QRCoverageAcrossStatesComponent) qrCoverageAcrossStatesComponent!: QRCoverageAcrossStatesComponent;
  @ViewChild(TotalPlaysPerCapitaComponent) totalPlaysPerCapitaComponent!: TotalPlaysPerCapitaComponent;

  constructor(private readonly _ETBService: ETBService,private readonly _nishthaService: NishthaService, private readonly _commonService: CommonService, private readonly _configService: ConfigService) {
    if(environment.config === 'state') {
      this.national = false;
    }

    this.getETBMetrics();
    this.getETBData(this.filters);
  }

  ngOnInit(): void {
  }

  getETBMetrics(): void {
    this._configService.getVanityMetrics('etb').subscribe(vanityMetricsRes => {
      this.ETBMetrics = vanityMetricsRes.result;
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
      dataSourceName: 'digital_learning',
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
    if(this.national){
      this.getETBData(filters);
    }
  }

}
