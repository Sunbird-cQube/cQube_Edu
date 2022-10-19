import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-school-education',
  templateUrl: './school-education.component.html',
  styleUrls: ['./school-education.component.scss']
})
export class SchoolEducationComponent implements OnInit {
  filters: any;
  metricFilter: any;
  levels: any;
  isMapReportLoading = true;
  level: string = 'state';
  national: boolean = true;
  fileName: string = "PGI_District_Wise_Performance";
  tabIndex = 0;

  pgiMetricsData: any;
  pgiStateData: any;
  tableData: any;
  columns: any[] = [];
  options: Highcharts.Options | undefined;

  constructor(private readonly _ETBService: ETBService, private readonly _commonService: CommonService, private readonly _spinner: NgxSpinnerService, private readonly _configService: ConfigService) {
    this.getPGIMetricsData();
    
    this.getStateWisePGICoverageData();
  }

  ngOnInit(): void {
    if(environment.config === 'state'){
      this.national = false;
      this.getPGIStateData(this.filters, this.levels, this.metricFilter);
    }
  }

  getPGIMetricsData(): void {
    this._configService.getVanityMetrics('pgi').subscribe(vanityMetricsRes => {
      this.pgiMetricsData = vanityMetricsRes.result;
    });
  }

  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    if((this.tabIndex === 2 && this.national) || (this.tabIndex === 0 && !this.national)) {
      this.getPGIStateData(this.filters, this.levels, this.metricFilter);
    }
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
      dataSourceName: 'school_education',
      reportName: 'pgi_district_performance',
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
      this.levels.forEach((level:any) => {
        this.level = level.selected ? level.value : 'state'
      })
      this.metricFilter = res.result.metricFilter;
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

}
