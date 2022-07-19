import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pgi',
  templateUrl: './pgi.component.html',
  styleUrls: ['./pgi.component.scss']
})
export class PGIComponent implements OnInit {
  state: any= 'IN';
  filters: any;
  metricFilter: any;
  levels: any;
  isMapReportLoading = true;

  pgiMetricsData: any;
  pgiStateData: any;
  tableData: any;
  columns: any[] = [];
  options: Highcharts.Options | undefined;

  constructor(private readonly _ETBService: ETBService, private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService, private readonly _configService: ConfigService) {
    this.getPGIMetricsData();
    this.getPGIStateData(this.filters, this.levels, this.metricFilter);
    this.getStateWisePGICoverageData();
  }

  ngOnInit(): void {
  }

  getPGIMetricsData(): void {
    this._configService.getVanityMetrics('pgi').subscribe(vanityMetricsRes => {
      this.pgiMetricsData = vanityMetricsRes.result;
    });
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  getStateWisePGICoverageData() {
    return this._ETBService.getStateWiseETBCoverageData().subscribe(res => {
      this.options = {
        title: {
          text: ""
        },
        yAxis: {
          title: {
            y: 60,
            text: 'Overall PGI Coverage'
          }
        },
        series: [{
          type: 'solidgauge',
          name: 'Speed',
          data: [60.6],
          innerRadius: '80%',
          dataLabels: {
            y: -20,
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}%</span><br/>' +
              '</div>'
          },
          tooltip: {
            valueSuffix: ' %'
          }
        }]
      }
    });
  }

  getPGIStateData(filters:any, levels:any, metricFilter: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'pgi',
      reportName: 'pgi_performance',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      levels,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.pgiStateData = res.result;
      this.filters = res.result.filters;
      this.levels = res.result.levels;
      this.metricFilter = res.result.metricFilter;
      if(res.result.code){
        this.state = res.result.code;
      }
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getPGIStateData(filters, this.levels, this.metricFilter);
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.getPGIStateData(this.filters, this.levels, metricFilter);
  }

  onSelectLevel(event: any): void {
    this.getPGIStateData(this.filters, event.items, this.metricFilter);
  }

}
